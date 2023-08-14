import { useEffect, useState } from "react";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import usePayrollService from "../../../common/hooks/payroll-service.hook";
import {
  IIncapacityTypes,
  IReasonsForWithdrawal,
  IWorker,
} from "../../../common/interfaces/payroll.interfaces";
import useIncapacityService from "../../../common/hooks/incapacity-service.hook";

export default function useListData() {
  const [listPeriods, setListPeriods] = useState([]);
  const [activeWorkerList, setActiveWorkerList] = useState([]);
  const [typesIncapacityList, setTypesIncapacityList] = useState([]);
  const [reasonsForWithdrawal, setReasonsForWithdrawal] = useState([]);

  const { getListByGrouper } = useGenericListService();
  const { getWorkers, getReasonsForWithdrawal } = usePayrollService();
  const { typeIncapacity } = useIncapacityService();

  useEffect(() => {
    getListByGrouper("PERIODOS")
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setListPeriods(
            response.data.map((item) => {
              const list = {
                name: item.itemDescription,
                value: item.itemCode,
              };
              return list;
            })
          );
        }
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    getWorkers()
      .then((response: ApiResponse<IWorker[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setActiveWorkerList(
            response.data.map((item) => {
              const list = {
                name: `${
                  item.numberDocument +
                  " - " +
                  item.firstName +
                  " " +
                  item.surname
                }`,
                value: item.employment.id,
              };
              return list;
            })
          );
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getReasonsForWithdrawal()
      .then((response: ApiResponse<IReasonsForWithdrawal[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setReasonsForWithdrawal(
            response.data.map((item) => {
              const list = {
                name: item.name,
                value: item.id,
              };
              return list;
            })
          );
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    typeIncapacity()
      .then((response: ApiResponse<IIncapacityTypes[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setTypesIncapacityList(
            response.data.map((item) => {
              return { name: item.name, value: item.id };
            })
          );
        }
      })
      .catch((err) => {});
  }, []);

  return {
    activeWorkerList,
    listPeriods,
    typesIncapacityList,
    reasonsForWithdrawal,
  };
}
