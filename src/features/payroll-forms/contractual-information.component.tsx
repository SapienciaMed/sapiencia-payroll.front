import React from "react";
import { InputComponent } from "../../common/components/Form/input.component";
import { SelectComponent } from "../../common/components/Form/select.component";
import { DatePickerComponent } from "../../common/components/Form/input-date.component";

const ContractualInformationForm = ({ register, errors }: any) => {
  return (
    <div>
      <div className="grid-form-4-container container-sections-forms ">
        <span className="text-black large bold grid-span-4-columns">Información contractual</span>
        <SelectComponent
          idInput="workerType"
          label="Tipo de trabajador"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="select-basic medium"
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
        <SelectComponent
          idInput="statusWorker"
          label="Estado"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="select-basic medium"
        />
        <SelectComponent
          idInput="chargeWorker"
          label="Cargo"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="select-basic medium"
        />
        <DatePickerComponent
          idInput="startDate"
          label="Fecha inicio de contrato"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
        />
        <DatePickerComponent
          idInput="endDate"
          label="Fecha fin de contrato"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
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
