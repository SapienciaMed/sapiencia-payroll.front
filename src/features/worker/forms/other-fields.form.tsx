import React from "react";
import { Controller } from "react-hook-form";
import { SelectComponent } from "../../../common/components/Form/select.component";
import { InputComponent } from "../../../common/components/Form/input.component";

const AffiliationsForm = ({
  register,
  errors,
  control,
  setValueRegister,
  list,
}: any) => {
  return (
    <div>
      <div className="grid-form-3-container gap-25 container-sections-forms ">
        <span className="text-black large bold grid-span-3-columns">
          Parafiscales
        </span>
        <Controller
          name="worker.eps"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="EPS"
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
        <Controller
          name="worker.fundPension"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Pension"
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
          name="worker.arl"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="ARL"
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
          name="worker.riskLevel"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Riesgo"
              register={register}
              errors={errors}
              data={list[3]}
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
          name="worker.severanceFund"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Fondo de cesantías"
              register={register}
              errors={errors}
              data={list[4]}
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
      <div className="grid-form-3-container gap-25 container-sections-forms ">
        <span className="text-black large bold grid-span-3-columns">
          Datos bancarios
        </span>
        <InputComponent
          idInput={"worker.acountNumber"}
          label={
            <>
              No. de cuenta
            </>
          }
          typeInput={"number"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />
        <Controller
          name="worker.acountType"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Tipo de cuenta"
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
          name="worker.bank"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Banco"
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
    </div>
  );
};

export default React.memo(AffiliationsForm);
