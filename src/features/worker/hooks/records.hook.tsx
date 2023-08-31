import { useRef, useContext } from "react";

import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IFilterVinculation,
  IGetVinculation,
} from "../../../common/interfaces/payroll.interfaces";
import { useNavigate } from "react-router-dom";
import useEmploymentsData from "./employment.hook";
import { removeEmptySpace } from "../../../common/utils/helpers";
import { AppContext } from "../../../common/contexts/app.context";
export default function useRecordsData() {
  const { typesContracts, activeWorker } = useEmploymentsData();

  const tableComponentRef = useRef(null);
  const navigate = useNavigate();

  const { setMessage } = useContext(AppContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<IFilterVinculation>();
  const tableColumns: ITableElement<IGetVinculation>[] = [
    {
      fieldName: "numberDocument",
      header: "Tipo y # documento",
      renderCell: (row) => {
        return <>{row.typeDocument + " " + row.numberDocument}</>;
      },
    },
    {
      fieldName: "firstName",
      header: "Nombres y Apellidos",
      renderCell: (row) => {
        return (
          <>
            {row.firstName +
              " " +
              row.secondName +
              " " +
              row.surname +
              " " +
              row.secondSurname}
          </>
        );
      },
    },
    {
      fieldName: "employment.typesContracts",
      header: "Tipo de vinculación",
      renderCell: (row) => {
        return <>{row.employment?.typesContracts[0].name}</>;
      },
    },
    {
      fieldName: "employment.startDate",
      header: "Fecha inicio",
      renderCell: (row) => {
        return (
          <>{DateTime.fromISO(String(row.employment.startDate)).toLocaleString()}</>
        );
      },
    },
    {
      fieldName: "employment.endDate",
      header: "Fecha fin",
      renderCell: (row) => {
        return <>{DateTime.fromISO(String(row.employment.endDate)).toLocaleString()}</>;
      },
    },
    {
      fieldName: "employment.retirementDate",
      header: "Fecha retiro",
      renderCell: (row) => {
        return (
          <>
            {row.employment.retirementDate
              ? DateTime.fromISO(String(row.employment.retirementDate)).toLocaleString()
              : "Sin fecha de retiro"}
          </>
        );
      },
    },
    {
      fieldName: "employment.state",
      header: "Estado",
      renderCell: (row) => {
        console.log(row.employment.state);
        return <>{row.employment.state !== "0" ? "Activo" : "Inactivo"}</>;
      },
    },
  ];
  const tableActions: ITableAction<IGetVinculation>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        navigate(`./view/${row?.id}`);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        if (row.employment.state !== "0") {
          navigate(`./edit/${row.id}`);
        } else {
          setMessage({
            title: "Vinculación inactiva",
            description: `No se permite editar la vinculacion debido a su estado inactiva.`,
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
        }
      },
    },
  ];

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const onSubmit = handleSubmit(async (data: IFilterVinculation) => {
    const names = removeEmptySpace(data.name);
    const surNames = removeEmptySpace(data.lastName);
    const datafilter = {
      ...data,
      firtsName: names.length > 0 ? names[0] : "",
      secondName: names.length > 1 ? names[1] : "",
      surname: surNames.length > 0 ? surNames[0] : "",
      secondSurname: surNames.length > 1 ? surNames[0] : "",
    };
    loadTableData(datafilter);
  });
  return {
    onSubmit,
    register,
    errors,
    control,
    activeWorker,
    typesContracts,
    reset,
    tableComponentRef,
    tableColumns,
    tableActions,
  };
}
