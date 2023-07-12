import React from "react";
import TableComponent from "../../../common/components/table.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { Controller, useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
import {
  ButtonComponent,
  SelectComponent,
} from "../../../common/components/Form";

const EmploymentRecordsPage = () => {
  const resolver = useYupValidationResolver(searchRecord);
  const {
    register,
    formState: { errors },
    control,
    setValue: setValueRegister,
  } = useForm({
    resolver: resolver,
    mode: "all",
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
            />
            <ButtonComponent value={"Buscar"} className="button-save big" />
          </div>
        </div>

        <div className="container-sections-forms">
          <TableComponent url={""} columns={[]} isShowModal={false} />
        </div>
      </div>
    </>
  );
};

export default React.memo(EmploymentRecordsPage);
