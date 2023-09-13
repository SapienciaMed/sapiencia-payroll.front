import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";
import { IFormPeriod } from "../../../common/interfaces/payroll.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";

import { createOrUpdateSpreadSheetSchema } from "../../../common/schemas";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useListData from "../../vacation/hooks/list.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";

interface IPropsUseCreateOrUpdateSpreadSheet {
  action: string;
}

const useCreateOrUpdateSpreadSheetHook = ({
  action,
}: IPropsUseCreateOrUpdateSpreadSheet) => {
  //react router dom
  const navigate = useNavigate();
  const { id } = useParams();

  // Context
  const { setMessage } = useContext(AppContext);

  //useState

  //custom hooks
  const { getByIdSpreadSheet, createSpreadSheet, updateSpreadSheet } =
    usePayrollService();
  const { typesSpreadSheetList, monthList } = useListData();

  //variables

  //use form
  const resolver = useYupValidationResolver(createOrUpdateSpreadSheetSchema);

  const { control, formState, handleSubmit } = useForm<IFormPeriod>({
    defaultValues: async () => loadDefaultValues(),
    mode: "all",
    resolver,
  });

  //useEffect

  //functions
  const renderTitleDeduction = () => {
    return action === "edit" ? "Editar planilla" : "Crear planilla";
  };

  const loadDefaultValues = async (): Promise<IFormPeriod> => {
    if (action === "new") {
      return {
        id: null,
        idFormType: null,
        state: "Generada",
        dateStart: null,
        dateEnd: null,
        paidDate: null,
        month: null,
        year: null,
        observation: "",
      };
    }

    if (action === "edit") {
      const { data, operation } = await getByIdSpreadSheet(Number(id));

      if (operation.code === EResponseCodes.OK) {
        if (data.length > 0) {
          return {
            id: data[0].id,
            idFormType: data[0].idFormType,
            state: "Generada",
            dateStart: data[0].dateStart,
            dateEnd: data[0].dateEnd,
            paidDate: data[0].paidDate,
            month: data[0].month,
            year: data[0].month,
            observation: data[0]?.observation,
          };
        } else {
          handleModalError("No se han cargado los datos");

          return {
            id: null,
            idFormType: null,
            state: "Generadas",
            dateStart: null,
            dateEnd: null,
            paidDate: null,
            month: null,
            year: null,
            observation: "",
          };
        }
      } else {
        handleModalError("No se han cargado los datos");

        return {
          id: null,
          idFormType: null,
          state: "Generadas",
          dateStart: null,
          dateEnd: null,
          paidDate: null,
          month: null,
          year: null,
          observation: "",
        };
      }
    }
  };

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar la planilla?`,
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
      description: `Planilla ${
        action === "edit" ? "editada" : "guardada"
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

  const handleSubmitSpreadSheet = handleSubmit((data: IFormPeriod) => {
    setMessage({
      title: `${action === "edit" ? "Editar" : "Crear"} planilla`,
      description: `¿Estás segur@ de ${action === "edit" ? "editar" : "crear"}
      la planilla?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateOrUpdateSpreadSheet(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleCreateOrUpdateSpreadSheet = async (data: IFormPeriod) => {
    const { data: dataResponse, operation } =
      action === "edit"
        ? await updateSpreadSheet(data)
        : await createSpreadSheet(data);

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  return {
    control,
    formState,
    typesSpreadSheetList,
    monthList,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitSpreadSheet,
  };
};

export default useCreateOrUpdateSpreadSheetHook;
