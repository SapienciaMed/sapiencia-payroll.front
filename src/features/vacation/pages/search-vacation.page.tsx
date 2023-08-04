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
  IWorkersVacationDetail,
} from "../../../common/interfaces/payroll.interfaces";
import VacationTable from "../forms/vacationTable";
import { AppContext } from "../../../common/contexts/app.context";
import useListData from "../hooks/list.hook";
import { useNavigate } from "react-router-dom";

const SearchVacationPage = () => {
  const tableComponentRef = useRef(null);
  const { setMessage } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
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
        return <>{DateTime.fromISO(row.dateFrom).toLocaleString()}</>;
      },
    },
    {
      fieldName: "dateUntil",
      header: "Hasta",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row.dateUntil).toLocaleString()}</>;
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
        return <>{row.periodFormer}</>;
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
          size:"large",         
          background: true,
        });
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        const idEnjoyedDay = row.codEmployment
        if(row.periodClosed){
          setMessage({
            title:"Editar Vacaciones",
            description:"Este periodo ya se encuentra finalizado y no es posible editarlo.",
            OkTitle:"Aceptar",
            background:true,
            show:true
          })
        }else{
          navigate(`../editar/${idEnjoyedDay}/${row.period}`);
        }
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
                  idInput={"workerId"}
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
                action={() => {
                  reset();
                  tableComponentRef.current.emptyData();
                }}
              />
              <ButtonComponent value={"Buscar"} className="button-save big" />
            </div>
          </FormComponent>
        </div>

        <div className="container-sections-forms">
          <TableComponent
            ref={tableComponentRef}
            url={`${process.env.urlApiPayroll}/api/v1/vacations/get-paginated`}
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
