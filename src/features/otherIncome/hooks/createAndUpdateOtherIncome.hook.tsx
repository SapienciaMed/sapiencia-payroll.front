import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";

import {
  IFormPeriod,
  IManualDeduction,
} from "../../../common/interfaces/payroll.interfaces";
import { EDeductionns } from "../../../common/constants/deductions.enum";

import { formDeduction } from "../../../common/schemas";
import { EResponseCodes } from "../../../common/constants/api.enum";

import useListData from "../../vacation/hooks/list.hook";
import useDeductionService from "../../../common/hooks/deduction-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import usePayrollService from "../../../common/hooks/payroll-service.hook";
import { DateTime } from "luxon";

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
  const [deductionsTypeByTypeList, setDeductionsTypeByTypeList] = useState([]);
  const [indexArrayYupValidator, setIndexArrayYupValidator] = useState(0);
  const [lastPeriodsList, setLastPeriodsList] = useState([]);
  //custom hooks
  const { activeWorkerList, periodsList } = useListData();
  const { getLastPeriods } = usePayrollService();

  const {
    getDeductionTypesByType,
    createDeduction,
    updateDeduction,
    getDeductionById,
  } = useDeductionService();

  //use form
  const currentValidationSchema = formDeduction[indexArrayYupValidator];

  const resolver = useYupValidationResolver(currentValidationSchema);

  const { control, formState, setValue, watch, handleSubmit } =
    useForm<IManualDeduction>({
      defaultValues: async () => loadDefaultValues(),
      mode: "all",
      resolver,
    });

  //useEffect

  //watch

  //functions
  const renderTitleDeduction = () => {
    return action === "edit"
      ? "Editar deducciones de renta"
      : "Crear deducciones de renta";
  };

  const loadDefaultValues = async (): Promise<any> => {};

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar la deducción de renta?`,
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

  const handleSubmitOtherIncome = handleSubmit((data: IManualDeduction) => {
    setMessage({
      title: "Confirmación de deducción",
      description: `¿Estás segur@ de ${
        action === "edit" ? "editar" : "ejecutar"
      }
      la deducción?`,
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

  const handleCreateOrUpdateOtherIncome = async (data: IManualDeduction) => {};

  return {
    control,
    formState,
    periodsList,
    activeWorkerList,
    deductionsTypeByTypeList,
    lastPeriodsList,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitOtherIncome,
  };
};

export default useCreateAndUpdateOtherIncome;
