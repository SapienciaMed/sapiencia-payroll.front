import { useContext, useState } from "react";

import { useForm } from "react-hook-form";

import useListData from "../../vacation/hooks/list.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";

import { IEmploymentWorker } from "../../../common/interfaces/payroll.interfaces";
import { searchStaff } from "../../../common/schemas";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";

export default function useSearchStaff() {
  const [dataEmployment, setDataEmployment] = useState<IEmploymentWorker[]>([]);

  const { activeWorkerList, reasonsForWithdrawal, getWorkersActive } =
    useListData();
  const { setMessage, validateActionAccess } = useContext(AppContext);
  const { getEmploymentById } = usePayrollService();

  const resolver = useYupValidationResolver(searchStaff);

  const {
    handleSubmit,
    formState: { errors: errorsStaff, isValid: isValidStaff },
    control: controlStaff,
    reset,
  } = useForm<{ workerId: string }>({
    defaultValues: { workerId: "" },
    resolver,
    mode: "all",
    shouldUnregister: true,
  });

  const onSubmitStaff = handleSubmit(async (data: { workerId: string }) => {
    const responseEmployment = await getEmploymentById(Number(data.workerId));

    if (responseEmployment.operation.code === EResponseCodes.OK) {
      setDataEmployment(responseEmployment.data);
    } else {
      setDataEmployment([]);
    }
  });

  const handleModalCancel = () => {
    setMessage({
      title: "Retiro de personal",
      description: `¿Estás segur@ que deseas cancelar el retiro de personal?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        clearDataEmployment();
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        setMessage({});
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  };
  const clearDataEmployment = () => {
    getWorkersActive();
    setDataEmployment([]);
    reset({ workerId: "" });
  };

  return {
    onSubmitStaff,
    errorsStaff,
    isValidStaff,
    controlStaff,
    activeWorkerList,
    dataEmployment,
    reasonsForWithdrawal,
    getWorkersActive,
    clearDataEmployment,
    handleModalCancel,
    setMessage,
    validateActionAccess,
  };
}
