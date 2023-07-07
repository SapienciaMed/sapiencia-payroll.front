import React from "react";
import { InputComponent } from "../../common/components/Form/input.component";
import { SelectComponent } from "../../common/components/Form/select.component";
import { Controller } from "react-hook-form";

const AffiliationsForm = ({
  register,
  errors,
  control,
  setValueRegister,
}: any) => {
  return (
    <div>
      <div className="grid-form-3-container container-sections-forms ">
        <span className="text-black large bold grid-span-3-columns">
          {" "}
          Parafiscales
        </span>
        <Controller
          name="eps"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="EPS"
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
          name="pension"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Pension"
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
          name="arl"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="ARL"
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
          name="levelRisk"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Riesgo"
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
          name="retirementFund"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Fondo de cesantías"
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

export default AffiliationsForm;
