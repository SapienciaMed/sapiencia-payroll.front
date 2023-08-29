import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useIncapacityService from "../../../common/hooks/incapacity-service.hook";
import { IIncapacity } from "../../../common/interfaces/payroll.interfaces";
import { createAndUpdateIncapacity } from "../../../common/schemas";
import { calculateDifferenceDays } from "../../../common/utils/helpers";
import { EResponseCodes } from "../../../common/constants/api.enum";

import { useNavigate, useParams } from "react-router-dom";

export default function useCreateAndUpdateIncapacityHook(action: string) {
  const { setMessage } = useContext(AppContext);

  const { createIncapacity, updateIncapacity, getByIdIncapacity } =
    useIncapacityService();

  const resolver = useYupValidationResolver(createAndUpdateIncapacity);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleModalSuccess = () => {
    setMessage({
      title: "Incapacidad",
      description: `Incapacidad ${
        action !== "new" ? "editada" : "creada"
      } con exito`,
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

  const handleModalError = (message: string) => {
    setMessage({
      title: `Error al ${
        action !== "new" ? "editar" : "crear"
      } la incapacidad.`,
      description: `${message || "Error"}, vuelve a intentarlo`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        setMessage({});
      },
      background: true,
    });
  };

  const loadDefaultValues = async (): Promise<IIncapacity> => {
    if (action !== "new") {
      const { data } = await getByIdIncapacity(Number(id));
      return {
        id: data.id,
        codEmployment: data.codEmployment,
        codIncapacityType: data.codIncapacityType,
        dateInitial: data.dateInitial,
        dateFinish: data.dateFinish,
        comments: data.comments,
        isExtension: data.isExtension,
      };
    } else {
      return {
        id: null,
        codEmployment: null,
        codIncapacityType: null,
        dateInitial: "",
        dateFinish: "",
        comments: "",
      };
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  } = useForm<IIncapacity>({
    defaultValues: async () => loadDefaultValues(),
    resolver,
    mode: "all",
  });

  const [startDate, endDate, isExtension] = watch([
    "dateInitial",
    "dateFinish",
    "isExtension",
  ]);

  const showDays = () => {
    if (startDate && endDate) {
      const days = calculateDifferenceDays(startDate, endDate);
      return days == 0 ? "1" : days;
    } else {
      return "0";
    }
  };

  const disabledFields = (validate = false) => {
    if (isExtension && action !== "new" && validate) {
      return false;
    }

    if (action === "new") {
      return false;
    }

    return true;
  };

  const handleCreateUpdateLicense = async (data: IIncapacity) => {
    const response =
      action !== "new"
        ? await updateIncapacity(data)
        : await createIncapacity(data);

    if (response.operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(response.operation.message);
    }
  };

  const onSubmit = handleSubmit(async (data: IIncapacity) => {
    setMessage({
      title: "Confirmacion de incapacidad",
      description: `¿Está segur@ de ejecutar esta accion?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateUpdateLicense(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  return {
    onSubmit,
    register,
    errors,
    control,
    showDays,
    navigate,
    disabledFields,
    startDate,
    endDate,
  };
}
