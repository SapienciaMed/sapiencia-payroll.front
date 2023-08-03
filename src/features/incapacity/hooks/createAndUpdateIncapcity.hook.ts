import { useForm } from "react-hook-form";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useIncapacityService from "../../../common/hooks/incapacity-service.hook";

import { IIncapacity } from "../../../common/interfaces/payroll.interfaces";

import { createAndUpdateIncapacity } from "../../../common/schemas";
import { calculateDifferenceDays } from "../../../common/utils/helpers";
import { EResponseCodes } from "../../../common/constants/api.enum";

import { useNavigate } from "react-router-dom";

export default function useCreateAndUpdateIncapacityHook() {
  const { createIncapacity } = useIncapacityService();

  const resolver = useYupValidationResolver(createAndUpdateIncapacity);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  } = useForm<IIncapacity>({
    defaultValues: {},
    resolver,
    mode: "all",
  });

  const [startDate, endDate] = watch(["dateInitial", "dateFinish"]);

  const showDays = () => {
    if (startDate && endDate) {
      return calculateDifferenceDays(startDate, endDate);
    } else {
      return "0";
    }
  };

  const onSubmit = handleSubmit(async (data: IIncapacity) => {
    const response = await createIncapacity(data);

    if (response.operation.code === EResponseCodes.OK) {
      alert("Exito");
      navigate("../consultar");
    } else {
      alert("Error");
    }
  });

  return {
    onSubmit,
    register,
    errors,
    control,
    showDays,
    navigate,
  };
}
