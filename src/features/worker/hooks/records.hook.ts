import { useEffect } from "react";
import { ApiResponse } from "../../../common/utils/api-response";
import { ITypesContracts } from "../../../common/interfaces/payroll.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IGenericList } from "../../../common/interfaces/global.interface";
import usePayrollService from "../../../common/hooks/payroll.hook";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";

export default function useRecordsData() {
  const { getTypesContracts } = usePayrollService();
  const { getListByParent, getListByGroupers } = useGenericListService();
}
