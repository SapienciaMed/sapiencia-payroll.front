import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";

import { IOtherIncome } from "../../../common/interfaces/payroll.interfaces";

import { EResponseCodes } from "../../../common/constants/api.enum";

import useListData from "../../vacation/hooks/list.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useOtherIncomeService from "../../../common/hooks/otherIncome-service.hook";
import usePayrollGenerate from "../../../common/hooks/payroll-generate.hook";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { createOrUpdateOtherIncome } from "../../../common/schemas";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { EStatesOtherIncome } from "../../../common/constants/otherincome.enum";

interface IPropsUseCreateAndUpdateOtherIncome {
  action: string;
}

const useCreateAndUpdateOtherIncome = ({
  action,
}: IPropsUseCreateAndUpdateOtherIncome) => {
  //react router dom
  const navigate = useNavigate();
  const { id } = useParams();

  // Context
  const { setMessage } = useContext(AppContext);

  //useState
  const [typeIncomeByTypeList, setTypeIncomeByTypeList] = useState<
    IDropdownProps[]
  >([]);

  const [statesOtherIncomeList, setStatesOtherIncomeList] = useState<
    IDropdownProps[]
  >([
    {
      name: "Pendiente",
      value: "Pendiente",
    },
    // {
    //   name: "Finalizado",
    //   value: "Finalizado",
    // },
    {
      name: "Anulado",
      value: "Anulado",
    },
  ]);

  //custom hooks
  const { activeWorkerList, periodsList } = useListData(false);
  const { getParametersByCodes } = useGenericListService();

  const { createOtherIncome, updateOtherIncome, getByIdOtherIncome } =
    useOtherIncomeService();

  const { getIncomeTypeByType } = usePayrollGenerate();

  //use form

  const resolver = useYupValidationResolver(createOrUpdateOtherIncome);

  const { control, formState, handleSubmit, watch, getFieldState, setValue } =
    useForm<IOtherIncome>({
      defaultValues: async () => loadDefaultValues(),
      mode: "all",
      resolver,
    });

  const [codTypeIncome, state] = watch(["codTypeIncome", "state"]);

  //useEffect
  useEffect(() => {
    loadInitList();
  }, []);

  useEffect(() => {
    if (formState.isDirty) setValue("value", null, { shouldValidate: true });
  }, [codTypeIncome]);

  //functions

  const validateStateField = (): boolean => {
    if (action === "new") {
      return true;
    }

    if (action === "edit") {
      const { isDirty } = getFieldState("state");

      if (!isDirty && state != EStatesOtherIncome.Pendiente) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  };

  const loadInitList = async (): Promise<void> => {
    const { data, operation } = await getIncomeTypeByType("Eventual");

    if (EResponseCodes.OK === operation.code) {
      const optionsTypeIncomeByType = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        } as IDropdownProps;
      });

      setTypeIncomeByTypeList(optionsTypeIncomeByType);
    } else {
      setTypeIncomeByTypeList([]);
    }
  };

  const renderTitleDeduction = () => {
    return action === "edit" ? "Editar otros ingresos" : "Crear otros ingresos";
  };

  const loadDefaultValues = async (): Promise<IOtherIncome> => {
    const { data: dataMaxValues, operation: operationMaxValues } =
      await getParametersByCodes(["TOPE_APROVECHAMIENTO_LIBRE"]);

    if (action === "new") {
      return {
        id: null,
        codEmployment: null,
        codPayroll: null,
        codTypeIncome: null,
        state: "Pendiente",
        value: null,
        valuesMax:
          operationMaxValues.code === EResponseCodes.OK ? dataMaxValues : [],
      } as IOtherIncome;
    }

    if (action === "edit") {
      const { data, operation } = await getByIdOtherIncome(Number(id));

      if (operation.code === EResponseCodes.OK) {
        return {
          id: data.id,
          codEmployment: data.codEmployment,
          codPayroll: data.codPayroll,
          codTypeIncome: data.codTypeIncome,
          state: data.state,
          value: data.value,
          valuesMax:
            operationMaxValues.code === EResponseCodes.OK ? dataMaxValues : [],
        } as IOtherIncome;
      } else {
        handleModalError("No se han cargado los datos");

        return {
          id: null,
          codEmployment: null,
          codPayroll: null,
          codTypeIncome: null,
          state: "Pendiente",
          value: null,
          valuesMax:
            operationMaxValues.code === EResponseCodes.OK ? dataMaxValues : [],
        } as IOtherIncome;
      }
    }
  };

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar el ingreso?`,
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

  const handleModalError = (
    msg = `¡Ha ocurrido un error!`,
    navigateBoolean = true
  ) => {
    setMessage({
      title: "Error",
      description: msg,
      show: true,
      OkTitle: "cerrar",
      onOk: () => {
        if (navigateBoolean) {
          navigate("../consultar");
        }
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        if (navigateBoolean) {
          navigate("../consultar");
        }
        setMessage({});
      },
      background: true,
    });
  };

  const handleModalSuccess = () => {
    setMessage({
      title: `Cambios guardados`,
      description: `Cambios guardados exitosamente`,
      show: true,
      OkTitle: "Aceptar",
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

  const handleSubmitOtherIncome = handleSubmit((data: IOtherIncome) => {
    setMessage({
      title: "Confirmación de ingreso",
      description: `¿Estás segur@ de ${
        action === "edit" ? "editar" : "ejecutar"
      }
      el ingreso?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateOrUpdateOtherIncome(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleCreateOrUpdateOtherIncome = async (data: IOtherIncome) => {
    const { data: dataResponse, operation } =
      action === "edit"
        ? await updateOtherIncome(data)
        : await createOtherIncome(data);

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  return {
    control,
    formState,
    periodsList,
    activeWorkerList,
    typeIncomeByTypeList,
    statesOtherIncomeList,
    validateStateField,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitOtherIncome,
  };
};

export default useCreateAndUpdateOtherIncome;
