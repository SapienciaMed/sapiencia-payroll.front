import { DateTime } from "luxon";
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

  //custom hooks
  const { activeWorkerList, periodsList } = useListData();
  const { createOtherIncome, updateOtherIncome, getByIdOtherIncome } =
    useOtherIncomeService();

  const { getIncomeTypeByType } = usePayrollGenerate();

  //use form

  const resolver = useYupValidationResolver(createOrUpdateOtherIncome);

  const { control, formState, handleSubmit } = useForm<IOtherIncome>({
    defaultValues: async () => loadDefaultValues(),
    mode: "all",
    resolver,
  });

  //useEffect
  useEffect(() => {
    loadInitList();
  }, []);

  //watch

  //functions

  const loadInitList = async (): Promise<void> => {
    const { data, operation } = await getIncomeTypeByType("otros");

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
    return action === "edit"
      ? "Editar otros ingresos de renta"
      : "Crear otros ingresos de renta";
  };

  const loadDefaultValues = async (): Promise<IOtherIncome> => {
    if (action === "new") {
      return {
        id: null,
        codEmployment: null,
        codPayroll: null,
        codTypeIncome: null,
        state: "Pendiente",
        value: null,
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
      title: ` ${action === "edit" ? "Editado" : "Guardado"}`,
      description: `Deducción ${
        action === "edit" ? "editada" : "ejecutada"
      } exitosamente`,
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
    renderTitleDeduction,
    redirectCancel,
    handleSubmitOtherIncome,
  };
};

export default useCreateAndUpdateOtherIncome;
