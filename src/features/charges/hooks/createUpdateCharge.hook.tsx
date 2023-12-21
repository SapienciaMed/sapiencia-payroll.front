import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";
import {
  ICharge,
  ITypesCharges,
} from "../../../common/interfaces/payroll.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";

import {
  createOrUpdateSpreadSheetSchema,
  createUpdateChargeSchema,
} from "../../../common/schemas";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useChargesService from "../../../common/hooks/charges-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import useListData from "../../vacation/hooks/list.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";

interface IPropsUseCreateOrUpdateCharge {
  action: string;
}

const useCreateOrUpdateChargeHook = ({
  action,
}: IPropsUseCreateOrUpdateCharge) => {
  //react router dom
  const navigate = useNavigate();
  const { id } = useParams();

  // Context
  const { setMessage } = useContext(AppContext);

  //useState
  const [typesChargesList, setTypesChargesList] = useState([]);
  const [typesContractsList, setTypesContractsList] = useState([]);
  //custom hooks
  const { createCharge, updateCharge, getChargeById, getTypesChargeList } =
    useChargesService();

  const { getTypesContracts } = usePayrollService();
  //variables

  //use form
  const resolver = useYupValidationResolver(createUpdateChargeSchema);

  const { control, formState, handleSubmit } = useForm<ICharge>({
    defaultValues: async () => loadDefaultValues(),
    mode: "all",
    resolver,
  });

  //useEffect
  useEffect(() => {
    getTypesChargeList().then((response: ApiResponse<ITypesCharges[]>) => {
      if (response && response?.operation?.code === EResponseCodes.OK) {
        setTypesChargesList(
          response.data.map((item) => {
            return { name: item.name, value: item.id };
          })
        );
      }
    });
  }, []);
  useEffect(() => {
    getTypesContracts().then((response: ApiResponse<ITypesCharges[]>) => {
      if (response && response?.operation?.code === EResponseCodes.OK) {
        setTypesContractsList(
          response.data.map((item) => {
            return { name: item.name, value: item.id };
          })
        );
      }
    });
  }, []);
  //functions

  const renderTitleDeduction = () => {
    return action === "edit" ? "Editar cargo" : "Crear cargo";
  };

  const loadDefaultValues = async (): Promise<ICharge> => {
    if (action === "new") {
      return {
        id: null,
        name: "",
        codChargeType: null,
        codContractType: null,
        state: true,
        baseSalary: null,
        observations: "",
      };
    }

    if (action === "edit") {
      const { data, operation } = await getChargeById(Number(id));

      if (operation.code === EResponseCodes.OK) {
        if (data) {
          return {
            id: data.id,
            name: data?.name,
            codChargeType: data.codChargeType,
            codContractType: null,
            state: data.state,
            baseSalary: data.baseSalary,
            observations: data?.observations,
          };
        } else {
          handleModalError("No se han cargado los datos");

          return {
            id: null,
            name: "",
            codChargeType: null,
            codContractType: null,
            state: true,
            baseSalary: null,
            observations: "",
          };
        }
      } else {
        handleModalError("No se han cargado los datos");

        return {
          id: null,
          name: "",
          codChargeType: null,
          codContractType: null,
          state: true,
          baseSalary: null,
          observations: "",
        };
      }
    }
  };

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar?`,
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
      description: `Cargo ${
        action === "edit" ? "editado" : "guardado"
      } exitosamente en el sistema`,
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

  const handleSubmitCharge = handleSubmit((data: ICharge) => {
    setMessage({
      title: `${action === "edit" ? "Editar" : "Crear"} Cargo`,
      description: `¿Estás segur@ de ${action === "edit" ? "editar" : "crear"}
      el cargo?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateOrUpdateCharge(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleCreateOrUpdateCharge = async (data: ICharge) => {
    const { data: dataResponse, operation } =
      action === "edit" ? await updateCharge(data) : await createCharge(data);

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  return {
    control,
    formState,
    typesChargesList,
    typesContractsList,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitCharge,
  };
};

export default useCreateOrUpdateChargeHook;
