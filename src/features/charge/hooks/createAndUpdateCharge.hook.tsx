import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";

import { ICharge } from "../../../common/interfaces/payroll.interfaces";
import { ApiResponse } from "../../../common/utils/api-response";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useChargeService from "../../../common/hooks/charge-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";

interface IPropsUseCreateAndUpdateDeductions {
  action: string;
}

const useCreateAndUpdateCharge = ({
  action,
}: IPropsUseCreateAndUpdateDeductions) => {
  //react router dom
  const navigate = useNavigate();
  const { id } = useParams();

  // Context
  const { setMessage } = useContext(AppContext);

  //useState

  //custom hooks

  const { createCharge, getChargeById, updateCharge } = useChargeService();

  //variables

  //use form
  // const resolver = useYupValidationResolver(currentValidationSchema);

  const { control, formState, handleSubmit } = useForm<ICharge>({
    defaultValues: async () => loadDefaultValues(),
    mode: "all",
    // resolver,
  });

  //watch

  //useEffect

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
        state: false,
        baseSalary: 0,
        observations: "",
      };
    }

    if (action === "edit") {
      const { data, operation } = await getChargeById(Number(id));

      if (operation.code === EResponseCodes.OK) {
        if (data.length > 0) {
          return {
            id: data[0].id,
            name: "",
            codChargeType: null,
            state: false,
            baseSalary: 0,
            observations: "",
          };
        } else {
          handleModalError("No se han cargado los datos");

          return {
            id: null,
            name: "",
            codChargeType: null,
            state: false,
            baseSalary: 0,
            observations: "",
          };
        }
      } else {
        handleModalError("No se han cargado los datos");

        return {
          id: null,
          name: "",
          codChargeType: null,
          state: false,
          baseSalary: 0,
          observations: "",
        };
      }
    }
  };

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar el cargo?`,
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
        action === "edit" ? "editado" : "ejecutado"
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

  const handleSubmitDeduction = handleSubmit((data: ICharge) => {
    setMessage({
      title: "Confirmación de deducción",
      description: `¿Estás segur@ de ${
        action === "edit" ? "editar" : "ejecutar"
      }
      la deducción?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateOrUpdateDeduction(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleCreateOrUpdateDeduction = async (data: ICharge) => {
    // const { data: dataResponse, operation } =
    //   action === "edit"
    //     ? await updateDeduction(data)
    //     : await createDeduction(data);
    // if (operation.code === EResponseCodes.OK) {
    //   handleModalSuccess();
    // } else {
    //   handleModalError(operation.message, false);
    // }
  };

  return {
    control,
    formState,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitDeduction,
  };
};

export default useCreateAndUpdateCharge;
