import { useEffect, useState } from "react";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import usePayrollService from "../../../common/hooks/payroll-service.hook";
import { IWorker } from "../../../common/interfaces/payroll.interfaces";


export default function useListData() {
const [listPeriods, setListPeriods] = useState([])
const [activeWorkerList, setActiveWorkerList] = useState([])
    const { getListByGrouper } = useGenericListService();
    const {getWorkers } = usePayrollService();
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
                name: `${item.numberDocument+" - "+item.firstName+" "+item.surname}`,
                value: item.employment.id,
              };
              return list;
            })
          );
        }
      })
      .catch((err) => {});
  }, []);

  return {
    activeWorkerList,
    listPeriods
  };
}