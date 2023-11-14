import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";

import { IOtherIncome } from "../../../common/interfaces/payroll.interfaces";

import { EResponseCodes } from "../../../common/constants/api.enum";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { createOrUpdateOtherIncome } from "../../../common/schemas";

import useListData from "../../vacation/hooks/list.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";

interface IPropsUseReport {}

const useReport = ({}: IPropsUseReport) => {
  //react router dom
  const navigate = useNavigate();
  const { id } = useParams();

  // Context
  const { setMessage } = useContext(AppContext);

  //useState

  //custom hooks
  const { activeWorkerList, periodsList } = useListData(false);

  //use form

  const resolver = useYupValidationResolver(createOrUpdateOtherIncome);

  const { control, formState, handleSubmit } = useForm<any>({
    defaultValues: {},
    mode: "all",
    resolver,
  });

  //useEffect

  //functions

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar la generación del reporte?`,
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
      title: "Confirmación de repporte",
      description: `¿Estás segur@ de ejecutar el reporte"
      }
      el ingreso?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        // handleCreateOrUpdateOtherIncome(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  // const handleCreateOrUpdateOtherIncome = async (data: IOtherIncome) => {
  //   const { data: dataResponse, operation } =
  //     action === "edit"
  //       ? await updateOtherIncome(data)
  //       : await createOtherIncome(data);

  //   if (operation.code === EResponseCodes.OK) {
  //     handleModalSuccess();
  //   } else {
  //     handleModalError(operation.message, false);
  //   }
  // };

  return {
    control,
    formState,
    periodsList,
    activeWorkerList,
    redirectCancel,
    handleSubmitOtherIncome,
  };
};

export default useReport;
