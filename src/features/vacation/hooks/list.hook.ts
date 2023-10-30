import { useEffect, useState } from "react";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import usePayrollService from "../../../common/hooks/payroll-service.hook";
import {
  IFormPeriod,
  IIncapacityTypes,
  IReasonsForWithdrawal,
  IWorker,
} from "../../../common/interfaces/payroll.interfaces";
import useIncapacityService from "../../../common/hooks/incapacity-service.hook";

export default function useListData(temporary = true) {
  const [listPeriods, setListPeriods] = useState([]);
  const [activeWorkerList, setActiveWorkerList] = useState([]);
  const [activeContractorsList, setActiveContractorsList] = useState([]);
  const [typesIncapacityList, setTypesIncapacityList] = useState([]);
  const [reasonsForWithdrawal, setReasonsForWithdrawal] = useState([]);
  const [periodsList, setPeriodsList] = useState([]);
  const [workerInfo, setWorkerInfo] = useState([]);
  const [typesSpreadSheetList, setTypesSpreadSheetList] = useState([]);
  const [stateSpreadSheetList, setStateSpreadSheetList] = useState([
    {
      name: "Pendientes",
      value: "Pendiente",
    },
    {
      name: "Generadas",
      value: "Generada",
    },
    {
      name: "Autorizadas",
      value: "Autorizada",
    },
  ]);
  const [monthList, setMonthList] = useState([
    {
      value: 1,
      name: "Enero",
    },
    {
      value: 2,
      name: "Febrero",
    },
    {
      value: 3,
      name: "Marzo",
    },
    {
      value: 4,
      name: "Abril",
    },
    {
      value: 5,
      name: "Mayo",
    },
    {
      value: 6,
      name: "Junio",
    },
    {
      value: 7,
      name: "Julio",
    },
    {
      value: 8,
      name: "Agosto",
    },
    {
      value: 9,
      name: "Septiembre",
    },
    {
      value: 10,
      name: "Octubre",
    },
    {
      value: 11,
      name: "Noviembre",
    },
    {
      value: 12,
      name: "Diciembre",
    },
  ]);

  const { getListByGrouper } = useGenericListService();
  const {
    getWorkers,
    getReasonsForWithdrawal,
    getPeriods,
    getTypeSpreadSheet,
    getContractors,
  } = usePayrollService();
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

  const getWorkersActive = () => {
    getWorkers(temporary)
      .then((response: ApiResponse<IWorker[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setWorkerInfo(response.data);
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
  };

  const getContractorsActive = () => {
    getContractors()
      .then((response: ApiResponse<IWorker[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setWorkerInfo(response.data);
          setActiveContractorsList(
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
  };

  useEffect(() => {
    getWorkersActive();
  }, []);

  useEffect(() => {
    getContractorsActive();
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
    getTypeSpreadSheet()
      .then((response) => {
        const { data, operation } = response;

        if (operation.code === EResponseCodes.OK) {
          const listSpreadSheet = data.map((item) => {
            return {
              name: item.name,
              value: item.id,
            };
          });

          setTypesSpreadSheetList(listSpreadSheet);
        } else {
          setTypesSpreadSheetList([]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getPeriods()
      .then((response: ApiResponse<IFormPeriod[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setPeriodsList(
            response.data.map((item) => {
              const list = {
                name: `${item.dateStart} - ${item.dateEnd}`,
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
    activeContractorsList,
    listPeriods,
    typesIncapacityList,
    reasonsForWithdrawal,
    periodsList,
    typesSpreadSheetList,
    stateSpreadSheetList,
    monthList,
    getWorkersActive,
    workerInfo,
  };
}
