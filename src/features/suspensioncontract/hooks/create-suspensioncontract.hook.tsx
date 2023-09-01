import React, { useContext, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AppContext } from "../../../common/contexts/app.context";

import {
  IContractSuspension,
  IContractSuspensionData,
  IEmploymentWorker,
} from "../../../common/interfaces/payroll.interfaces";

import { createSuspensionContractSchema } from "../../../common/schemas";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import {
  addCalendarDays,
  calculateDifferenceDays,
} from "../../../common/utils/helpers";

const useCreateSuspensionContract = () => {
  // Context
  const { setMessage } = useContext(AppContext);

  //states

  //refs

  //custom hooks
  const { getEmploymentById, createSuspensionContract } = usePayrollService();

  // react router dom
  const { idEmployment } = useParams();
  const navigate = useNavigate();

  //use form
  const resolver = useYupValidationResolver(createSuspensionContractSchema);
  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm<IContractSuspension>({
      resolver,
      defaultValues: async () => loadDefaultValues(),
      mode: "all",
    });

  const [
    adjustEndDate,
    dateStart,
    dateEnd,
    dateStartSuspension,
    dateEndSuspension,
  ] = watch([
    "adjustEndDate",
    "dateStart",
    "dateEnd",
    "dateStartSuspension",
    "dateEndSuspension",
  ]);

  //use effect

  useEffect(() => {
    setValue("dateEndSuspension", null);
  }, [dateStartSuspension]);

  // calculate new date end contract
  useEffect(() => {
    if (dateStartSuspension && dateEndSuspension) {
      const diferenceDays = calculateDifferenceDays(
        dateStartSuspension,
        dateEndSuspension
      );

      const newDateEndContract = addCalendarDays(dateEnd, diferenceDays, false);

      setValue("newDateEnd", newDateEndContract);
    } else {
      setValue("newDateEnd", null);
    }
  }, [dateStartSuspension, dateEndSuspension]);

  //functions
  const onSubmitCreateSuspensionContract = handleSubmit(async (data) => {
    setMessage({
      title: "Confirmacion de suspensión",
      description: `¿Está segur@ de ejecutar
      la supensión?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateSuspensionContract(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const loadDefaultValues = async () => {
    if (!idEmployment) {
      handleModalError("No existen los datos del empleado");

      return {
        id: null,
        names: "",
        surnames: "",
        typeContract: "",
        nroContract: "",
        dateStart: null,
        dateEnd: null,
        codEmployment: null,
        dateStartSuspension: null,
        dateEndSuspension: null,
        adjustEndDate: false,
        newDateEnd: null,
        observation: "",
      };
    }

    const { data, operation } = await getEmploymentById(Number(idEmployment));

    if (operation.code === EResponseCodes.OK) {
      if (data.length > 0) {
        return {
          id: null,
          names: `${data[0].worker.firstName} ${data[0].worker.secondName}`,
          surnames: `${data[0].worker.surname} ${data[0].worker.secondSurname}`,
          typeContract: `${data[0].typesContracts[0].name}`,
          nroContract: `${data[0].contractNumber}`,
          dateStart: `${data[0].startDate}`,
          dateEnd: `${data[0].endDate}`,
          codEmployment: data[0].id,
          dateStartSuspension: null,
          dateEndSuspension: null,
          adjustEndDate: false,
          newDateEnd: null,
          observation: "",
        };
      } else {
        handleModalError("No existen los datos del empleado");

        return {
          id: null,
          names: "",
          surnames: "",
          typeContract: "",
          nroContract: "",
          dateStart: null,
          dateEnd: null,
          codEmployment: null,
          dateStartSuspension: null,
          dateEndSuspension: null,
          adjustEndDate: false,
          newDateEnd: null,
          observation: "",
        };
      }
    } else {
      handleModalError("No existen los datos del empleado");

      return {
        id: null,
        names: "",
        surnames: "",
        typeContract: "",
        nroContract: "",
        dateStart: null,
        dateEnd: null,
        codEmployment: null,
        dateStartSuspension: null,
        dateEndSuspension: null,
        adjustEndDate: false,
        newDateEnd: null,
        observation: "",
      };
    }
  };

  const maxDateSuspensionDate = (): Date => {
    const dateActual = new Date();

    const yearActual = dateActual.getFullYear();

    return new Date(yearActual, 11, 31);
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

  const handleModalSuccess = () => {
    setMessage({
      title: "Guardado",
      description: `Suspensión ejecutada exitosamente`,
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

  const handleCreateSuspensionContract = async (data: IContractSuspension) => {
    const dataSuspensionContract: IContractSuspensionData = {
      codEmployment: data.codEmployment,
      dateStart: data.dateStartSuspension,
      dateEnd: data.dateEndSuspension,
      adjustEndDate: data.adjustEndDate,
      newDateEnd: data.newDateEnd,
      observation: data.observation,
    };

    const { data: dataResponse, operation } = await createSuspensionContract(
      dataSuspensionContract
    );

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message);
    }
  };

  //variables

  return {
    register,
    control,
    formState,
    onSubmitCreateSuspensionContract,
    redirectCancel,
    maxDateSuspensionDate,
    adjustEndDate,
    dateStart,
    dateStartSuspension,
  };
};

export default useCreateSuspensionContract;
