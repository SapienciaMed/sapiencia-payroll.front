import React from "react";
import {
  ButtonComponent,
  DatePickerComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
  TextAreaComponent,
} from "../../../common/components/Form";
import { Controller } from "react-hook-form";
import useLicenceData from "../hooks/create-licence.hook";
import {
  addBusinessDays,
  addCalendarDays,
} from "../../../common/utils/helpers";

const CreateLicencePage = () => {
  const {
    handleModalCreate,
    handleModalCancel,
    register,
    errors,
    control,
    activeWorkerList,
    licenceTypesList,
    listLicencesStates,
    dateStart,
    sending,
    isValid,
    numberDays,
    typeDays,
  } = useLicenceData();

  return (
    <>
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black biggest bold">Crear Licencias</label>
          </div>
          <FormComponent
            id="createVacationForm"
            className="form-signIn"
            action={handleModalCreate}
          >
            <div className="container-sections-forms">
              <div className="grid-form-3-container gap-25">
                <label className="text-black biggest bold grid-span-3-columns">
                  Información del empleado
                </label>
                <div className="grid-span-2-columns">
                  <SelectComponent
                    idInput={"codEmployment"}
                    control={control}
                    errors={errors}
                    data={activeWorkerList}
                    label={
                      <>
                        Documento - Nombre empleado <span>*</span>
                      </>
                    }
                    className="select-basic medium "
                    classNameLabel="text-black big bold"
                    placeholder="Seleccione"
                    filter={true}
                  />
                </div>

                <SelectComponent
                  idInput={"idLicenceType"}
                  control={control}
                  errors={errors}
                  data={licenceTypesList}
                  label={
                    <>
                      Tipo de licencias <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                />

                <label className="text-black biggest bold grid-span-3-columns">
                  Período
                </label>
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
                  disabledDays={typeDays == "Habil" ? [0, 6] : []}
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
                  disabledDays={typeDays == "Habil" ? [0, 6] : []}
                  minDate={dateStart}
                  maxDate={
                    numberDays !== 0
                      ? typeDays === "Habil"
                        ? addBusinessDays(dateStart, numberDays)
                        : addCalendarDays(dateStart, numberDays)
                      : new Date("9999-12-31")
                  }
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
                  data={listLicencesStates}
                  label={
                    <>
                      Estado <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                  disabled={true}
                />
                <Controller
                  control={control}
                  name={"resolutionNumber"}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        value={`${field.value}`}
                        className="input-basic medium"
                        errors={errors}
                        typeInput="text"
                        classNameLabel="text-black big bold"
                        label={
                          <>
                            Número de resolución <span>*</span>
                          </>
                        }
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        register={register}
                      />
                    );
                  }}
                />

                <div className=" grid-span-3-columns">
                  <Controller
                    control={control}
                    name={"observation"}
                    render={({ field }) => {
                      return (
                        <TextAreaComponent
                          idInput={field.name}
                          className="text-area-basic"
                          classNameLabel="text-black big bold"
                          label="Observaciones"
                          register={register}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={false}
                          errors={errors}
                          rows={5}
                        />
                      );
                    }}
                  />
                  <div className="text-right">
                    <span className="text-span ">Max. {500} carácteres</span>
                  </div>
                </div>
              </div>
              <div className="button-save-container-display">
                <ButtonComponent
                  value={"Cancelar"}
                  type="button"
                  className="button-clean bold"
                  action={handleModalCancel}
                  disabled={sending}
                />
                <ButtonComponent
                  value={"Guardar"}
                  form="createVacationForm"
                  className="button-save big disabled-black"
                  disabled={!isValid || sending}
                />
              </div>
            </div>
          </FormComponent>
        </div>
      </div>
    </>
  );
};

export default React.memo(CreateLicencePage);
