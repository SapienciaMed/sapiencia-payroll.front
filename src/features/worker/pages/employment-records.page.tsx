import React, { useState } from "react";
import TableComponent from "../../../common/components/table.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../common/components/Form";
import useRecordsData from "../hooks/records.hook";

const EmploymentRecordsPage = () => {
  const [tableView, setTableView] = useState<boolean>(false);
  const {
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
  } = useRecordsData();
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
                action={() => {
                  reset();
                  tableComponentRef.current.emptyData();
                  setTableView(false);
                }}
              />
              <ButtonComponent
                value={"Buscar"}
                className="button-save big"
                form="searchRecordForm"
                action={() => {
                  setTableView(true);
                }}
                type="submit"
              />
            </div>
          </FormComponent>
        </div>
        {tableView && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/vinculation/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(EmploymentRecordsPage);
