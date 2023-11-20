import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  IEditVacation,
  IVacationResult,
} from "../../../common/interfaces/payroll.interfaces";
import { calculateBusinessDays } from "../../../common/utils/helpers";
import useVacationService from "../../../common/hooks/vacation-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
export default function useEditVacationData() {
  const [vacation, setVacation] = useState<IVacationResult>(null);
  const navigate = useNavigate();
  const { updateVacation } = useVacationService();
  const { getWorkerVacatioByParam } = useVacationService();
  const { setMessage } = useContext(AppContext);
  const { id, period } = useParams();
  const {
    handleSubmit,
    register,
    setValue: setValueRegister,
    formState: { errors },
    control,
    watch,
  } = useForm<IEditVacation>();
  const [startVacation, endVacation, refund] = watch([
    "dateFrom",
    "dateUntil",
    "refund",
  ]);
  const vacationInfo = async () => {
    const params = {
      workerId: id,
      period: period,
    };
    await getWorkerVacatioByParam(params)
      .then((response: ApiResponse<IVacationResult>) => {
        if (response?.operation?.code === EResponseCodes.OK) {
          setVacation(response.data);
          setValueRegister(
            "dateFrom",
            response.data.vacationDay
              .filter((day) => !day.paid)
              .sort((a, b) => b.id - a.id)[0]?.dateFrom
          );
          setValueRegister(
            "dateUntil",
            response.data.vacationDay
              .filter((day) => !day.paid)
              .sort((a, b) => b.id - a.id)[0]?.dateUntil
          );
          setValueRegister(
            "observation",
            response.data.vacationDay
              .filter((day) => !day.paid)
              .sort((a, b) => b.id - a.id)[0]?.observation
          );
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
  };

  useEffect(() => {
    vacationInfo();
  }, []);

  useEffect(() => {
    const days = calculateBusinessDays(startVacation, endVacation);
    setValueRegister("totalDays", days);
    setValueRegister(
      "pendingTotalDays",
      vacation?.available +
        (vacation?.vacationDay
          .filter((day) => !day.paid)
          .sort((a, b) => b.id - a.id)[0]?.enjoyedDays -
          days)
    );
  }, [endVacation]);

  const handleModalEdit = handleSubmit(async (data: IEditVacation) => {
    setMessage({
      title: "Editar periodo de vacaciones",
      description: `¿Estás segur@ de editar este periodo de vacaciones?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        onEdit(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const onEdit = async (data: IEditVacation) => {
    const dataEdit = {
      id: Number(vacation.id),
      idVacationDay: vacation?.vacationDay
        .filter((day) => !day.paid)
        .sort((a, b) => b.id - a.id)[0]?.id,
      dateFrom: data?.dateFrom,
      dateUntil: data?.dateUntil,
      observation: data?.observation,
      available: data?.pendingTotalDays,
      refundTypes: data?.refund,
      refund:
        vacation?.vacationDay
          .filter((day) => !day.paid)
          .sort((a, b) => b.id - a.id)[0]?.enjoyedDays -
        Number(data?.totalDays),
      enjoyed:
        Number(vacation?.enjoyed) -
        (vacation?.vacationDay
          .filter((day) => !day.paid)
          .sort((a, b) => b.id - a.id)[0]?.enjoyedDays -
          Number(data?.totalDays)),
    };
    await updateVacation(dataEdit)
      .then((response: ApiResponse<IEditVacation>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setMessage({
            type: EResponseCodes.OK,
            title: "Vacaciones.",
            description: "periodo de vacaciones editado satisfactoriamente.",
            show: true,
            OkTitle: "Aceptar",
            onOk() {
              navigate("../consultar");
              setMessage((prev) => {
                return { ...prev, show: false };
              });
            },
            onClose() {
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
            title: "Error al editar periodo.",
            description:
              "Se ha presentado un error, por favor vuelve a intentarlo.",
            show: true,
            OkTitle: "Aceptar",
            background: true,
          });
        }
      })
      .catch((err) => {
        setMessage({
          type: EResponseCodes.FAIL,
          title: "Error al editar el periodo",
          description:
            "Se ha presentado un error, por favor vuelve a intentarlo.",
          show: true,
          OkTitle: "Aceptar",
          background: true,
        });
      });
  };
  const handleCancelModal = () => {
    setMessage({
      title: "Cancelar editar periodo de vacaciones",
      description: `¿Segur@ que deseas cancelar el editar de este periodo de vacaciones?`,
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

  return {
    handleModalEdit,
    register,
    control,
    errors,
    refund,
    vacation,
    handleCancelModal,
  };
}
