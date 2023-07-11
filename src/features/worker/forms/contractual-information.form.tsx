import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { SelectComponent, InputComponent } from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";

interface IContractualInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  setValueRegister: UseFormSetValue<any>;
  list: any[][];
}

const ContractualInformationForm = ({
  register,
  errors,
  control,
  setValueRegister,
  list,
}: IContractualInformationProp) => {
  const [antiquity, setAntiquity] = useState("0");
  return (
    <div>
      <div className="grid-form-4-container gap-25 container-sections-forms ">
        <span className="text-black large bold grid-span-4-columns">
          Información contractual
        </span>
        <Controller
          name="employment.idTypeContract"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Tipo de vinculacion <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[0]}
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
          idInput="employment.contractNumber"
          typeInput="text"
          label={
            <>
              Numero de contrato <span>*</span>
            </>
          }
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
        />
        <Controller
          name="employment.state"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Estado <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[2]}
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
          name="employment.idCharge"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Cargo <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[1]}
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
          name="employment.startDate"
          render={({ field }) => {
            return (
              <DatePickerComponent
                id={field.name}
                idInput={field.name}
                value={field.value}
                label={
                  <>
                    Fecha inicio de contrato <span>*</span>
                  </>
                }
                register={register}
                errors={errors}
                classNameLabel="text-black big bold"
                setValueRegister={setValueRegister}
                onchange={field.onChange}
                className="dataPicker-basic  medium "
                setValue={setAntiquity}
                maxDate={new Date()}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="employment.endDate"
          render={({ field }) => {
            return (
              <DatePickerComponent
                id={field.name}
                idInput={field.name}
                value={field.value}
                label={<>Fecha fin de contrato</>}
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
          errors={errors}
          value={antiquity ? antiquity : "0"}
          classNameLabel="text-black big bold"
          className="input-basic medium"
          disabled={true}
        />
        <InputComponent
          idInput="employment.institutionalMail"
          typeInput="email"
          label={
            <>
              Correo institucional <span>*</span>
            </>
          }
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
        />
      </div>
    </div>
  );
};

export default React.memo(ContractualInformationForm);
