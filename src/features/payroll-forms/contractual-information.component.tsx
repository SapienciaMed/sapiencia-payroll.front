import React from "react";
import { InputComponent } from "../../common/components/Form/input.component";
import { SelectComponent } from "../../common/components/Form/select.component";
import { DatePickerComponent } from "../../common/components/Form/input-date.component";
import { Controller } from "react-hook-form";

const ContractualInformationForm = ({
  register,
  errors,
  control,
  setValueRegister,
}: any) => {
  return (
    <div>
      <div className="grid-form-4-container container-sections-forms ">
        <span className="text-black large bold grid-span-4-columns">
          Información contractual
        </span>
        <Controller
          name="workerType"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Tipo de trabajador"
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
        <InputComponent
          idInput="contractNumber"
          typeInput="text"
          label="Número de contracto"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
        />
        <Controller
          name="statusWorker"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Estado"
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
          name="chargeWorker"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Cargo"
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
          control={control}
          name="startDate"
          render={({ field }) => {
            return (
              <DatePickerComponent
                id={field.name}
                idInput={field.name}
                value={field.value}
                label="Fecha inicio de contrato"
                register={register}
                errors={errors}
                classNameLabel="text-black big bold"
                setValueRegister={setValueRegister}
                onchange={field.onChange}
                className="dataPicker-basic  medium "
              />
            );
          }}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => {
            return (
              <DatePickerComponent
                id={field.name}
                idInput={field.name}
                value={field.value}
                label="Fecha fin de contrato"
                register={register}
                errors={errors}
                classNameLabel="text-black big bold"
                setValueRegister={setValueRegister}
                onchange={field.onChange}
                className="dataPicker-basic  medium "
              />
            );
          }}
        />
        <InputComponent
          idInput="antiquity"
          typeInput="text"
          label="Antiguedad"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
        />
        <InputComponent
          idInput="institucionalEmail"
          typeInput="email"
          label="Correo institucional"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
        />
      </div>
    </div>
  );
};

export default ContractualInformationForm;
