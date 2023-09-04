import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createUpdateIncrementSalarySchema } from "../../../common/schemas";

import { EResponseCodes } from "../../../common/constants/api.enum";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import {
  ICharge,
  ISalaryIncrement,
} from "../../../common/interfaces/payroll.interfaces";

import {
  calculateIncrement,
  caculatePorcentual,
} from "../../../common/utils/helpers";

import { AppContext } from "../../../common/contexts/app.context";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";
import useIncrementSalaryService from "../../../common/hooks/increment-salary-service.hook";

export default function useCreateUpdateIncrementSalary(action: string) {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getCharges } = usePayrollService();

  const {
    createIncrementSalary,
    getByIdIncrementSalary,
    updateIncrementSalary,
  } = useIncrementSalaryService();

  //states
  const [charges, setCharges] = useState<IDropdownProps[]>([]);
  const [chargeData, setChargeData] = useState<ICharge[]>([]);

  //ref

  //react-router-dom
  const navigate = useNavigate();
  const { id } = useParams();

  //useForm
  const resolver = useYupValidationResolver(createUpdateIncrementSalarySchema);

  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm<ISalaryIncrement>({
      resolver,
      mode: "all",
      defaultValues: async () => loadDefaultValues(),
    });

  const [
    codCharge,
    porcentualIncrement,
    previousSalary,
    porcentualValue,
    newSalary,
  ] = watch([
    "codCharge",
    "porcentualIncrement",
    "previousSalary",
    "porcentualValue",
    "newSalary",
  ]);

  // useEffects

  //carga combos

  useEffect(() => {
    loadDropdown();
  }, []);

  // watch

  useEffect(() => {
    if (formState.dirtyFields.codCharge) {
      if (codCharge) {
        const { baseSalary } = chargeData.find(
          (charge) => Number(charge.id) === codCharge
        );
        setValue("previousSalary", baseSalary);
      } else {
        setValue("previousSalary", null);
      }
    }
  }, [codCharge]);

  useEffect(() => {
    if (
      formState.dirtyFields.porcentualIncrement ||
      formState.dirtyFields.codCharge
    ) {
      setValue("newSalary", null, { shouldValidate: true });
      setValue("porcentualValue", null);
    }
  }, [porcentualIncrement, codCharge]);

  useEffect(() => {
    if (
      formState.dirtyFields.porcentualValue ||
      formState.dirtyFields.codCharge
    ) {
      if (porcentualValue && previousSalary) {
        const valueIncrement = calculateIncrement(
          Number(previousSalary),
          Number(porcentualValue)
        );

        setValue("newSalary", valueIncrement, { shouldValidate: true });
      } else {
        setValue("newSalary", null, { shouldValidate: true });
      }
    }
  }, [porcentualValue, codCharge]);

  useEffect(() => {
    if (newSalary) {
      const incrementValue = Number(newSalary) - Number(previousSalary);
      setValue("incrementValue", incrementValue, { shouldValidate: true });
    } else {
      setValue("incrementValue", null, { shouldValidate: true });
    }
  }, [newSalary]);

  //functions
  const loadDropdown = async (): Promise<void> => {
    //charges
    const { data, operation } = await getCharges();
    if (operation.code === EResponseCodes.OK) {
      const chargesList = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });

      setChargeData(data);
      setCharges(chargesList);
    } else {
      setCharges([]);
    }
  };

  const loadDefaultValues = async (): Promise<ISalaryIncrement> => {
    if (action === "edit" && id) {
      const { data, operation } = await getByIdIncrementSalary(Number(id));

      if (operation.code === EResponseCodes.OK) {
        return {
          id: data.id,
          codCharge: data.codCharge,
          effectiveDate: data.effectiveDate,
          numberActApproval: data.numberActApproval,
          porcentualIncrement: data.porcentualIncrement,
          porcentualValue: data.porcentualIncrement
            ? caculatePorcentual(data.previousSalary, data.newSalary)
            : null,
          incrementValue: data.incrementValue,
          previousSalary: data.previousSalary,
          newSalary: data.newSalary,
          observation: data.observation,
        } as ISalaryIncrement;
      } else {
        handleModalError("¡Ha ocurrido un error al cargar los datos!");
      }
    } else {
      return {
        id: null,
        codCharge: null,
        effectiveDate: null,
        numberActApproval: "",
        porcentualIncrement: false,
        porcentualValue: null,
        incrementValue: null,
        previousSalary: null,
        newSalary: null,
        observation: "",
      } as ISalaryIncrement;
    }
  };

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que desea 
      cancelar el incremento?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  };

  const onSubmit = handleSubmit(async (data: ISalaryIncrement) => {
    setMessage({
      title: action === "edit" ? "Editar" : "Guardar",
      description: `¿Está segur@ de ${
        action === "edit" ? "editar" : "guardar"
      } el incremento de salario?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateIncrementSalary(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleModalSuccess = () => {
    setMessage({
      title: action === "edit" ? "Editado" : "Guardado",
      description: `¡Se ha ${
        action === "edit" ? "editado" : "guardado"
      } el incremento de salario exitosamente!`,
      show: true,
      OkTitle: "cerrar",
      onOk: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        navigate("../consultar");
        setMessage({});
      },
      background: true,
    });
  };

  const handleModalError = (msg = `¡Ha ocurrido un error!`) => {
    setMessage({
      title: "Error",
      description: msg,
      show: true,
      OkTitle: "cerrar",
      onOk: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        navigate("../consultar");
        setMessage({});
      },
      background: true,
    });
  };

  const handleCreateIncrementSalary = async (
    dataIncrement: ISalaryIncrement
  ) => {
    const response =
      action === "edit"
        ? await updateIncrementSalary(dataIncrement)
        : await createIncrementSalary(dataIncrement);

    if (response.operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(
        `¡Ha ocurrido un error al ${
          action === "edit" ? "editar" : "crear"
        } el incremento de salario!`
      );
    }
  };

  //variables

  return {
    register,
    control,
    formState,
    onSubmit,
    redirectCancel,
    charges,
    porcentualIncrement,
    codCharge,
  };
}
