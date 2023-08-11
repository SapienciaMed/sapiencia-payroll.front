import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useForm } from "react-hook-form";

import useListData from "../../vacation/hooks/list.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";

import { IEmploymentWorker } from "../../../common/interfaces/payroll.interfaces";
import { searchStaff } from "../../../common/schemas";
import { EResponseCodes } from "../../../common/constants/api.enum";

export default function useSearchStaff() {
  const [dataEmployment, setDataEmployment] = useState<IEmploymentWorker[]>([]);

  const { activeWorkerList, reasonsForWithdrawal } = useListData();

  const { getEmploymentById } = usePayrollService();

  const resolver = useYupValidationResolver(searchStaff);

  const {
    handleSubmit,
    formState: { errors: errorsStaff },
    control: controlStaff,
    reset,
  } = useForm<{ workerId: string }>({
    defaultValues: { workerId: "" },
    resolver,
    mode: "all",
  });

  const onSubmitStaff = handleSubmit(async (data: { workerId: string }) => {
    const responseEmployment = await getEmploymentById(Number(data.workerId));

    if (responseEmployment.operation.code === EResponseCodes.OK) {
      setDataEmployment(responseEmployment.data);
    } else {
      setDataEmployment([]);
    }
  });

  const clearDataEmployment = () => {
    setDataEmployment([]);
    reset({ workerId: "" });
  };

  return {
    onSubmitStaff,
    errorsStaff,
    controlStaff,
    activeWorkerList,
    dataEmployment,
    reasonsForWithdrawal,
    clearDataEmployment,
  };
}
