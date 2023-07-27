import React, { useRef } from "react";
import TableComponent from "../../../common/components/table.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { Controller, useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
import { DateTime } from "luxon";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../common/components/Form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IFilterVinculation,
  IGetVinculation,
} from "../../../common/interfaces/payroll.interfaces";
import { useNavigate } from "react-router-dom";
import useEmploymentsData from "../hooks/employment.hook";

const EmploymentRecordsPage = () => {
  const { typesContracts, activeWorker } = useEmploymentsData();
  const tableComponentRef = useRef(null);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchRecord);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue: setValueRegister,
    control,
    reset,
  } = useForm<IFilterVinculation>({ resolver });
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
          <>{DateTime.fromISO(row.employment.startDate).toLocaleString()}</>
        );
      },
    },
    {
      fieldName: "employment.endDate",
      header: "Fecha fin",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row.employment.endDate).toLocaleString()}</>;
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
        navigate(`./edit/${row.id}`);
      },
    },
  ];

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const onSubmit = handleSubmit(async (data: IFilterVinculation) => {
    loadTableData(data);
  });

  return (
    <>
      <div className="container-sections-forms m-24px">
        <div>
          <span className="text-black extra-large bold">
            Consultar Expediente
          </span>
        </div>
        <div>
          <FormComponent
            id="searchRecordForm"
            className="form-signIn"
            action={onSubmit}
          >
            <div className="container-sections-forms">
              <div className="grid-form-3-container gap-25">
                <InputComponent
                  idInput={"documentNumber"}
                  label={<>No. Documento</>}
                  typeInput={"text"}
                  register={register}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <SelectComponent
                  idInput={"state"}
                  control={control}
                  errors={errors}
                  data={activeWorker}
                  label={<>Estado</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                />
                <SelectComponent
                  idInput={"vinculationType"}
                  control={control}
                  errors={errors}
                  data={typesContracts}
                  label={<>Tipo de vinculación</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                />
              </div>
              <div className="grid-form-2-container gap-25 mt-14px">
                <InputComponent
                  idInput={"name"}
                  label={<>Nombre</>}
                  typeInput={"text"}
                  register={register}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput={"lastName"}
                  label={<>Apellido</>}
                  typeInput={"text"}
                  register={register}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
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
            url={`${process.env.urlApiPayroll}/api/v1/employment/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(EmploymentRecordsPage);
