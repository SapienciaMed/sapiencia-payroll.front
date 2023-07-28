import React, { useContext, useRef } from "react";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
import { Controller, useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../common/components/Form";
import TableComponent from "../../../common/components/table.component";
import { DateTime } from "luxon";
import {
  IFilterVacation,
  IWorkersVacation,
  IWorkersVacationDetail,
} from "../../../common/interfaces/payroll.interfaces";
import VacationTable from "../forms/vacationTable";
import { AppContext } from "../../../common/contexts/app.context";
import useListData from "../hooks/list.hook";

const SearchVacationPage = () => {
  const tableComponentRef = useRef(null);
  const resolver = useYupValidationResolver(searchRecord);
  const { setMessage } = useContext(AppContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue: setValueRegister,
    control,
    reset,
  } = useForm<IFilterVacation>({ resolver });
  const tableColumns: ITableElement<IWorkersVacation>[] = [
    {
      fieldName: "nameWorker",
      header: "Colaborador",
      renderCell: (row) => {
        return <>{row.documentWorker}</>;
      },
    },
    {
      fieldName: "period",
      header: "Periodo",
      renderCell: (row) => {
        return <>{row}</>;
      },
    },
    {
      fieldName: "startDate",
      header: "Desde",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row).toLocaleString()}</>;
      },
    },
    {
      fieldName: "endDate",
      header: "Hasta",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row).toLocaleString()}</>;
      },
    },
    {
      fieldName: "endingPeriod",
      header: "Finalizado",
      renderCell: (row) => {
        return <>{row ? "si" : "No"}</>;
      },
    },
    {
      fieldName: "pendingDays",
      header: "Días",
      renderCell: (row) => {
        return <>{row}</>;
      },
    },
  ];
  const tableActions: ITableAction<IWorkersVacationDetail>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        const worker = {
          worker: {
            documentWorker: row.worker.documentWorker,
            nameWorker: row.worker.nameWorker,
            period: row.worker.period,
            charge: row.worker.charge,
            salary: row.worker.salary,
          },
        };

        const enjoyedDays = {
          enjoyedDays: {
            startDate: DateTime.fromISO(row.enjoyedDays.startDate),
            endDate: DateTime.fromISO(row.enjoyedDays.endDate),
            totalDays: 0,
          },
        };

        const compensatedDays = {
          compensatedDays: {
            startDateCompensatedDays:
              row.compensatedDays.startDateCompensatedDays,
            totalCompensatoryDays: row.compensatedDays.totalCompensatoryDays,
          },
        };

        const refund = {
          refund: {
            pendingDays: row.refund.pendingDays,
            refundDays: row.refund.refundDays ? 1 : 0,
          },
        };

        const balances = {
          balances: {
            previousBalance: row.balances.previousBalance,
            daysEarned: row.balances.daysEarned,
            currentBalance: row.balances.currentBalance,
          },
        };

        const observation = {
          observation: row.observation,
        };

        const rows = [
          worker,
          enjoyedDays,
          compensatedDays,
          refund,
          balances,
          observation,
        ];

        setMessage({
          title: "Detalle posición presupuestaria",
          show: true,
          OkTitle: "Aceptar",
          description: (
            <VacationTable rows={rows as IWorkersVacationDetail[]} />
          ),
          background: true,
        });
      },
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

  const { listPeriods, activeWorkerList } = useListData();
  return (
    <>
      <div className="container-sections-forms m-24px">
        <div>
          <span className="text-black extra-large bold">Vacaciones</span>
        </div>
        <div>
          <FormComponent
            id="searchRecordForm"
            className="form-signIn"
            action={onSubmit}
          >
            <div className="container-sections-forms">
              <div className="grid-form-2-container gap-25">
                <SelectComponent
                  idInput={"documentWorker"}
                  control={control}
                  errors={errors}
                  data={activeWorkerList}
                  label={"Colaborador"}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                  filter={true}
                />
                <SelectComponent
                  idInput={"period"}
                  control={control}
                  errors={errors}
                  data={listPeriods}
                  label={"Periodo"}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                />
              </div>
            </div>
            <div className="button-save-container-display">
              <ButtonComponent
                value={"Limpiar campos"}
                className="button-clean bold"
                type="button"
                action={reset}
              />
              <ButtonComponent value={"Buscar"} className="button-save big" />
            </div>
          </FormComponent>
        </div>

        <div className="container-sections-forms">
          <TableComponent
            ref={tableComponentRef}
            url={""}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
          />
        </div>
      </div>
    </>
  );
};

export default SearchVacationPage;
