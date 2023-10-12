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

  const { control, formState, handleSubmit, watch, setValue } =
    useForm<IFormPeriod>({
      defaultValues: async () => loadDefaultValues(),
      mode: "all",
      resolver,
    });

  const [month, year, dateStart, dateEnd, idFormType] = watch([
    "month",
    "year",
    "dateStart",
    "dateEnd",
    "idFormType",
  ]);

  //useEffect

  useEffect(() => {
    if (formState.isDirty) {
      setValue("dateStart", null);
    }
  }, [idFormType, month, year]);

  useEffect(() => {
    if (formState.isDirty) {
      setValue("dateEnd", null);
      setValue("paidDate", null);
    }
  }, [dateStart]);

  //functions

  const validateDatesStart = (): {
    validateDateStart: Date;
    validateDateEnd: Date;
  } => {
    if (month && year) {
      return {
        validateDateStart: new Date(year, month - 1, 1),
        validateDateEnd: new Date(year, month, 0),
      };
    }
  };

  const validateDatesEnd = (): {
    validateDateStart: Date;
    validateDateEnd: Date;
  } => {
    if (idFormType === 1) {
      // Quincenal
      const dateEndNew = new Date(dateStart);

      dateEndNew.setDate(dateEndNew.getDate() + 14);

      return {
        validateDateStart: new Date(dateStart),
        validateDateEnd: dateEndNew,
      };
    }

    if (idFormType == 2) {
      // Mensual
      const dateEndNew = new Date(dateStart);

      dateEndNew.setMonth(dateEndNew.getMonth() + 1, 0);

      return {
        validateDateStart: new Date(dateStart),
        validateDateEnd: dateEndNew,
      };
    }

    if (idFormType == 3) {
      // Prima solo debe permitir 6 meses
      const dateEndNew = new Date(dateStart);

      if (month === 6) {
        dateEndNew.setMonth(12);
      } else {
        dateEndNew.setMonth(dateEndNew.getMonth() + 5);
      }

      return {
        validateDateStart: new Date(dateStart),
        validateDateEnd: dateEndNew,
      };
    }

    if (idFormType == 4) {
      // Prima Bonificacion debe permitir un 1 a;o
      const dateEndNew = new Date(dateStart);

      dateEndNew.setFullYear(dateEndNew.getFullYear() + 1);

      return {
        validateDateStart: new Date(dateStart),
        validateDateEnd: dateEndNew,
      };
    }

    return {
      validateDateStart: new Date(dateStart),
      validateDateEnd: new Date(year, 12, 0),
    };
  };

  const renderTitleDeduction = () => {
    return action === "edit" ? "Editar planilla" : "Crear planilla";
  };

  const loadDefaultValues = async (): Promise<IFormPeriod> => {
    if (action === "new") {
      return {
        id: null,
        idFormType: null,
        state: "Pendiente",
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
        if (data) {
          return {
            id: data.id,
            idFormType: data.idFormType,
            state: "Pendiente",
            dateStart: data.dateStart,
            dateEnd: data.dateEnd,
            paidDate: data.paidDate,
            month: data.month,
            year: data.year,
            observation: data?.observation,
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
          state: "Pendiente",
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
    console.log(data);
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
    month,
    year,
    idFormType,
    dateStart,
    dateEnd,
    validateDatesStart,
    validateDatesEnd,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitSpreadSheet,
  };
};

export default useCreateOrUpdateSpreadSheetHook;
