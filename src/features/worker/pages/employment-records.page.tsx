import React, { useRef } from "react";
import TableComponent from "../../../common/components/table.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { Controller, useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
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
  IVinculation,
  IWorker,
} from "../../../common/interfaces/payroll.interfaces";

const EmploymentRecordsPage = () => {
  const tableComponentRef = useRef(null);
  const resolver = useYupValidationResolver(searchRecord);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue: setValueRegister,
    control,
    reset,
  } = useForm<IFilterVinculation>({ resolver });
  const tableColumns: ITableElement<IVinculation>[] = [
    {
      fieldName: "document",
      header: "Tipo y # documento",
    },
    {
      fieldName: "name",
      header: "Nombres y Apellidos",
    },
    {
      fieldName: "number",
      header: "Tipo de vinculación",
    },
    {
      fieldName: "startDate",
      header: "Fecha inicio",
    },
    {
      fieldName: "endDate",
      header: "Fecha fin",
    },
  ];
  const tableActions: ITableAction<IVinculation>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        console.log(row);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        console.log(row);
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
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <SelectComponent
                      id={field.name}
                      idInput={field.name}
                      label={<>Estado</>}
                      register={register}
                      errors={errors}
                      data={[]}
                      className="select-basic medium"
                      classNameLabel="text-black big bold"
                      value={field.value}
                      setValueRegister={setValueRegister}
                      onchange={field.onChange}
                      placeholder="Seleccione"
                    />
                  )}
                />
                <Controller
                  name="vinculationType"
                  control={control}
                  render={({ field }) => (
                    <SelectComponent
                      id={field.name}
                      idInput={field.name}
                      label={<>Tipo de vinculación</>}
                      register={register}
                      errors={errors}
                      data={[]}
                      className="select-basic medium"
                      classNameLabel="text-black big bold"
                      value={field.value}
                      setValueRegister={setValueRegister}
                      onchange={field.onChange}
                      placeholder="Seleccione"
                    />
                  )}
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
