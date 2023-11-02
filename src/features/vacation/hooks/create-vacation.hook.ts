import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
import {
  IVacation,
  IWorkersVacation,
} from "../../../common/interfaces/payroll.interfaces";

import { calculateBusinessDays } from "../../../common/utils/helpers";
import useListData from "./list.hook";
import useVacationService from "../../../common/hooks/vacation-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import { AppContext } from "../../../common/contexts/app.context";

export default function useCreateVacationData() {
  const [pendingDays, setPendingDays] = useState<string>("0");
  const [vacation, setVacation] = useState<IVacation>(null);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchRecord);
  const { setMessage } = useContext(AppContext);
  const { activeWorkerList, listPeriods } = useListData(false);
  const { getWorkerVacatioByParam, createVacation } = useVacationService();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue: setValueRegister,
    watch,
  } = useForm<IWorkersVacation>({ resolver });
  const [checkEnjoyedDays, checkCompensatoryDays] = watch([
    "checkEnjoyedDays",
    "checkCompensatoryDays",
  ]);
  const [startVacation, endVacation, compensatoryDays, totalDaysEnjoyed] =
    watch([
      "startDate",
      "endDate",
      "totalCompensatoryDays",
      "totalDaysEnjoyed",
    ]);

  useEffect(() => {
    if (!checkEnjoyedDays) {
      setValueRegister("startDate", "");
      setValueRegister("endDate", "");
      setValueRegister("totalDaysEnjoyed", 0);
    }

    if (!checkCompensatoryDays) {
      setValueRegister("startDateCompensatedDays", "");
      setValueRegister("totalCompensatoryDays", 0);
      setValueRegister("pendingDays", 0);
    }
  }, [checkEnjoyedDays, checkCompensatoryDays]);

  useEffect(() => {
    let daysFormated = 0;

    if (startVacation && endVacation) {
      const days = calculateBusinessDays(startVacation, endVacation);
      daysFormated = days === 0 ? 1 : days;
    }

    setValueRegister("totalDaysEnjoyed", Number(`${daysFormated}`));
    if (compensatoryDays > vacation?.available - totalDaysEnjoyed) {
      setValueRegister("totalCompensatoryDays", 0);
    }
  }, [endVacation]);

  useEffect(() => {
    setValueRegister("endDate", "");
  }, [startVacation]);

  useEffect(() => {
    const totalDaysEnjoyedValue = totalDaysEnjoyed ?? 0;
    const compensatoryDaysValue = compensatoryDays ?? 0;
    const availableDays = vacation?.available
      ? Number(vacation?.available) +
        Number(vacation?.periodFormer ?? 0) +
        Number(vacation?.refund ?? 0)
      : 0;
    if (compensatoryDays > availableDays - totalDaysEnjoyed) {
      setValueRegister("totalCompensatoryDays", 0);
    }
    setPendingDays(
      `${
        Number(availableDays) -
        (Number(compensatoryDaysValue) + Number(totalDaysEnjoyedValue))
      }`
    );
  }, [compensatoryDays]);

  const onSubmit = handleSubmit(async (data: IWorkersVacation) => {
    const params = {
      workerId: data.idWorker,
      period: parseInt(data.period),
    };
    setValueRegister("startDateCompensatedDays", "");
    setValueRegister("startDate", "");
    setValueRegister("endDate", "");
    setValueRegister("totalCompensatoryDays", 0);
    setValueRegister("totalCompensatoryDays", 0);
    await getWorkerVacatioByParam(params)
      .then((response: ApiResponse<IVacation>) => {
        if (
          response &&
          response?.operation?.code === EResponseCodes.OK &&
          response?.data
        ) {
          setVacation(response.data);
        } else {
          setMessage({
            type: EResponseCodes.FAIL,
            title: "Crear periodo de vacaciones.",
            description: "No hay resultado para la búsqueda",
            show: true,
            OkTitle: "Aceptar",
            background: true,
          });
          setVacation({} as IVacation);
        }
      })
      .catch((err) => {
        setMessage({
          type: EResponseCodes.FAIL,
          title: "Crear período de vacaciones.",
          description:
            "Se ha presentado un error, por favor vuelve a intentarlo.",
          show: true,
          OkTitle: "Aceptar",
          background: true,
        });
      });
  });

  const handleModal = () => {
    setMessage({
      title: "Cancelar periodo de vacaciones",
      description: `¿Segur@ que deseas cancelar el periodo de vacaciones?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      onCancel: () => {
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      background: true,
    });
  };

  const calculateVacationDays = (data) => {
    const dataVacationDays = [];

    if (data.checkEnjoyedDays) {
      dataVacationDays.push({
        codVacation: vacation.id,
        dateFrom: data.startDate,
        dateUntil: data.endDate,
        enjoyedDays: data.totalDaysEnjoyed,
        paid: false,
        observation: data.observation,
      });
    }

    if (data.checkCompensatoryDays) {
      dataVacationDays.push({
        codVacation: vacation.id,
        dateFrom: data.startDate,
        enjoyedDays: data.totalCompensatoryDays,
        paid: true,
        observation: data.checkEnjoyedDays ? "" : data.observation,
      });
    }

    return dataVacationDays;
  };

  const showMessage = (response) => {
    if (response && response?.operation?.code === EResponseCodes.OK) {
      setMessage({
        type: EResponseCodes.OK,
        title: "Vacaciones.",
        description: "periodo de vacaciones creado con exito.",
        show: true,
        OkTitle: "Aceptar",
        onClose() {
          navigate("../consultar");
          setMessage((prev) => {
            return { ...prev, show: false };
          });
        },
        onOk() {
          navigate("../consultar");
          setMessage((prev) => {
            return { ...prev, show: false };
          });
        },
        background: true,
      });
    } else {
      setMessage({
        type: EResponseCodes.FAIL,
        title: "Error al crear periodo.",
        description:
          "Se ha presentado un error, por favor vuelve a intentarlo.",
        show: true,
        OkTitle: "Aceptar",
        background: true,
      });
    }
  };

  const handleCreateVacation = async (dataVacation) => {
    try {
      const response = await createVacation(dataVacation);
      showMessage(response);
    } catch (err) {
      showMessage({}); // Handle error here
    }
  };

  const onCreate = handleSubmit(async (data: IWorkersVacation) => {
    const totalDaysEnjoyed = Number(data?.totalDaysEnjoyed) || 0;
    const totalCompensatoryDays = Number(data?.totalCompensatoryDays) || 0;
    const totalEnjoyedDays = totalDaysEnjoyed + totalCompensatoryDays;
    let enjoyedDays = totalEnjoyedDays;
    let avaibleDays = Number(vacation?.available) || 0;
    let formedDays = Number(vacation?.periodFormer) || 0;
    let refundDays = Number(vacation?.refund) || 0;
    let days = Number(vacation?.days) || 0;

    // Restar los días de formedDays primero
    if (enjoyedDays >= formedDays) {
      enjoyedDays -= formedDays;
      formedDays = 0;
    } else {
      formedDays -= enjoyedDays;
      enjoyedDays = 0;
    }

    // Restar los días de refundDays si es necesario
    if (enjoyedDays >= refundDays) {
      enjoyedDays -= refundDays;
      refundDays = 0;
    } else {
      refundDays -= enjoyedDays;
      enjoyedDays = 0;
    }

    // Restar los días restantes de la categoría 'remainingDays'
    if (enjoyedDays >= days) {
      enjoyedDays -= days;
      days = 0;
    } else {
      days -= enjoyedDays;
      enjoyedDays = 0;
    }

    // La suma de los días disponibles es la suma que queda de todas las categorías
    avaibleDays = formedDays + refundDays + days;

    const dataVacation = {
      vacationDay: calculateVacationDays(data),
      enjoyedDays: totalEnjoyedDays,
      avaibleDays,
      refundDays,
      formedDays,
      days,
      periodId: vacation?.id,
    };

    setMessage({
      title: "Crear periodo de vacaciones",
      description: "¿Estás segur@ de crear el periodo de vacaciones?",
      show: true,
      OkTitle: "Aceptar",
      onOk() {
        handleCreateVacation(dataVacation);
      },
      background: true,
      cancelTitle: "cancelar",
    });
  });
  const vacationData = [
    { title: "Saldo anterior", value: `${vacation?.periodFormer ?? 0}` },
    { title: "Días ganados", value: `${vacation?.days ?? 0}` },
    {
      title: "Saldo actual",
      value: `${vacation?.available ?? 0}`,
    },
  ];

  return {
    onSubmit,
    control,
    errors,
    activeWorkerList,
    listPeriods,
    vacationData,
    onCreate,
    register,
    vacation,
    checkEnjoyedDays,
    startVacation,
    checkCompensatoryDays,
    pendingDays,
    handleModal,
  };
}
