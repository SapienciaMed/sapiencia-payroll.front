import React from "react";
import {
    ButtonComponent,
  DatePickerComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
  TextAreaComponent,
} from "../../../common/components/Form";
import { Controller, useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ILicence } from "../../../common/interfaces/payroll.interfaces";
import { createLicence } from "../../../common/schemas";

const CreateLicencePage = () => {
  const resolver = useYupValidationResolver(createLicence);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue: setValueRegister,
    watch,
  } = useForm<ILicence>({ resolver });
  return (
    <>
      <div className="container-sections-forms m-24px">
        <h1>Crear  Licencias</h1>
        <FormComponent
          id="createVacationForm"
          className="form-signIn"
          action={alert("hola")}
        >
          <div className="grid-form-3-container gap-25 container-sections-forms m-24px">
            <h2 className="grid-span-3-columns">Información del empleado</h2>
            <div className="grid-span-2-columns"><SelectComponent
              idInput={"codEmployment"}
              control={control}
              errors={errors}
              data={[]}
              label={
                <>
                  Documento - Nombre empleado <span>*</span>
                </>
              }
              className="select-basic medium "
              classNameLabel="text-black big bold"
              placeholder="Seleccione"
              filter={true}
            /></div>
            
            <SelectComponent
              idInput={"idLicenceType"}
              control={control}
              errors={errors}
              data={[]}
              label={
                <>
                  Tipo de licencias <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione"
            />

            <h2 className="grid-span-3-columns">Período</h2>
            <DatePickerComponent
              idInput={"dateStart"}
              control={control}
              label={
                <>
                  Fecha inicio <span>*</span>
                </>
              }
              errors={errors}
              classNameLabel="text-black big break-line bold"
              className="dataPicker-basic  medium "
              disabled={false}
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
              disabledDays={[0, 6]}
            />
            <DatePickerComponent
              idInput={"dateEnd"}
              control={control}
              label={
                <>
                  Fecha fin <span>*</span>
                </>
              }
              errors={errors}
              classNameLabel="text-black big break-line bold"
              className="dataPicker-basic  medium "
              disabled={false}
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
              disabledDays={[0, 6]}
            />
            <Controller
              control={control}
              name={"totalDays"}
              defaultValue={0}
              render={({ field }) => {
                return (
                  <InputComponent
                    id={field.name}
                    idInput={field.name}
                    value={`${field.value}`}
                    className="input-basic medium"
                    typeInput="text"
                    classNameLabel="text-black big bold"
                    label="Total días"
                    register={register}
                    disabled={true}
                  />
                );
              }}
            />
            <SelectComponent
              idInput={"licenceState"}
              control={control}
              errors={errors}
              data={[]}
              label={
                <>
                  Estado <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione"
            />
            <Controller
              control={control}
              name={"resolutionNumber"}
              defaultValue={""}
              render={({ field }) => {
                return (
                  <InputComponent
                    id={field.name}
                    idInput={field.name}
                    value={`${field.value}`}
                    className="input-basic medium"
                    typeInput="text"
                    classNameLabel="text-black big bold"
                    label={
                      <>
                        Número de resolución <span>*</span>
                      </>
                    }
                    register={register}
                  />
                );
              }}
            />
            <div className=" grid-span-3-columns">
              <TextAreaComponent
                idInput={"observation"}
                className="text-area-basic"
                classNameLabel="text-black big bold"
                label="Observaciones"
                register={register}
                disabled={false}
                errors={errors}
                rows={5}
              />
            </div>
          </div>
          <div className="button-save-container-display mr-24px ">
        <ButtonComponent
          value={"Cancelar"}
          type="button"
          className="button-clean bold"
          
        />
        <ButtonComponent
          value={"Guardar"}
          type="submit"
          form="createVacationForm"
          className="button-save big disabled-black"
        />
      </div>
        </FormComponent>
      </div>
    </>
  );
};

export default React.memo(CreateLicencePage);
