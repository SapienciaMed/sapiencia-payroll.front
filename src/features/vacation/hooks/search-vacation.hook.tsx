import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IFilterVacation,
  IWorkersVacationDetail,
} from "../../../common/interfaces/payroll.interfaces";
import VacationTable from "../forms/vacationTable";
import { AppContext } from "../../../common/contexts/app.context";
import useListData from "./list.hook";
import { useNavigate } from "react-router-dom";

export default function useSearchVacationData() {
  const tableComponentRef = useRef(null);
  const { setMessage, validateActionAccess } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<IFilterVacation>();
  const tableColumns: ITableElement<IWorkersVacationDetail>[] = [
    {
      fieldName: "employment.worker.firstName",
      header: "Colaborador",
      renderCell: (row) => {
        return (
          <>
            {row.employment.worker.firstName +
              " " +
              row.employment.worker.surname}
          </>
        );
      },
    },
    {
      fieldName: "period",
      header: "Periodo",
      renderCell: (row) => {
        return <>{row.period}</>;
      },
    },
    {
      fieldName: "dateFrom",
      header: "Desde",
      renderCell: (row) => {
        return <>{row.dateFrom}</>;
      },
    },
    {
      fieldName: "dateUntil",
      header: "Hasta",
      renderCell: (row) => {
        return <>{row.dateUntil}</>;
      },
    },
    {
      fieldName: "periodClosed",
      header: "Finalizado",
      renderCell: (row) => {
        return <>{row.periodClosed ? "si" : "No"}</>;
      },
    },
    {
      fieldName: "pendingDays",
      header: "Días",
      renderCell: (row) => {
        return <>{row.periodClosed ? 0 : row.periodFormer}</>;
      },
    },
  ];
  const tableActions: ITableAction<IWorkersVacationDetail>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        setMessage({
          title: "Detalle Vacaciones",
          show: true,
          OkTitle: "Aceptar",
          description: (
            <div className="container-modal_description">
              <VacationTable row={row} />
            </div>
          ),
          OkButtonStyle: "button-ok small",
          background: true,
          size: "extra-large",
        });
      },
      hide: !validateActionAccess("VACACION_CONSULTAR"),
    },
    {
      icon: "Edit",
      onClick: (row) => {
        const idEnjoyedDay = row.codEmployment;
        if (row.periodClosed) {
          setMessage({
            title: "Editar Vacaciones",
            description:
              "Este periodo ya se encuentra finalizado y no es posible editarlo.",
            OkTitle: "Aceptar",
            background: true,
            show: true,
          });
        } else {
          navigate(`../editar/${idEnjoyedDay}/${row.period}`);
        }
      },
      hide: !validateActionAccess("VACACION_EDITAR"),
    },
  ];

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const onSubmit = handleSubmit(async (data: IFilterVacation) => {
    loadTableData(data);
  });

  const { listPeriods, activeWorkerList } = useListData("no");

  const [workerId, period] = watch(["workerId", "period"]);

  return {
    navigate,
    onSubmit,
    control,
    errors,
    activeWorkerList,
    listPeriods,
    reset,
    tableComponentRef,
    period,
    workerId,
    tableColumns,
    tableActions,
    setMessage,
    validateActionAccess,
  };
}
