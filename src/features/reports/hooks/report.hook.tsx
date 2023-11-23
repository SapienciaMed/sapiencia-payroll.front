import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";

import {
  IOtherIncome,
  IReport,
} from "../../../common/interfaces/payroll.interfaces";

import { EResponseCodes } from "../../../common/constants/api.enum";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import {
  createOrUpdateOtherIncome,
  generateReporSchema,
} from "../../../common/schemas";

import useListData from "../../vacation/hooks/list.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useReportService from "../../../common/hooks/report-service..hook";
import { descargarArchivo } from "../../../common/utils/helpers";

interface IPropsUseReport {}

const useReport = ({}: IPropsUseReport) => {
  //react router dom
  const navigate = useNavigate();
  // Context
  const { setMessage } = useContext(AppContext);

  //useState

  //custom hooks
  const { activeWorkerList, periodsListBiweeklyAuthorized } =
    useListData(false);
  const { generateReport } = useReportService();

  //use form

  const resolver = useYupValidationResolver(generateReporSchema);

  const { control, formState, handleSubmit, reset, watch, setValue } =
    useForm<IReport>({
      defaultValues: {
        period: "",
        codEmployment: "",
        typeReport: null,
      },
      mode: "all",
      resolver,
    });

  const typeReport = watch("typeReport");

  //useEffect

  useEffect(() => {
    if (formState.dirtyFields.typeReport)
      setValue("period", "", { shouldValidate: true });
  }, [typeReport]);

  //functions

  const clearFields = () => {
    const radios = document.getElementsByName(
      "typeReport"
    ) as NodeListOf<HTMLInputElement>;

    radios.forEach((e) => (e.checked = false));

    reset();
  };

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

  const handleSubmitOtherIncome = handleSubmit((data: IReport) => {
    setMessage({
      title: "Confirmación de reporte",
      description: `¿Estás segur@ de ejecutar el reporte?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleGenerateReport(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleGenerateReport = async (report: IReport) => {
    const { data, operation } = await generateReport(report);
    if (operation.code === EResponseCodes.OK) {
      descargarArchivo(data.bufferFile.data, data.nameFile);
    } else {
      handleModalError(
        "Error al generar el reporte, puede no tener historicos de planilla asociado el usuario o se encuentran en estado fallido",
        false
      );
    }
  };

  return {
    control,
    formState,
    periodsListBiweeklyAuthorized,
    activeWorkerList,
    typeReport,
    redirectCancel,
    handleSubmitOtherIncome,
    clearFields,
  };
};

export default useReport;
