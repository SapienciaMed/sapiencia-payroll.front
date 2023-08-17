import React, { useContext } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { SelectComponent } from "../../../common/components/Form/select.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { AppContext } from "../../../common/contexts/app.context";
import useEmploymentsData from "../hooks/employment.hook";
import { IVinculation } from "../../../common/interfaces/payroll.interfaces";

interface IOtherInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  list: any[];
  setValueRegister: UseFormSetValue<any>;
  action: string;
  changedData: number;
  getValueRegister: UseFormGetValues<IVinculation>;
}

const AffiliationsForm = ({
  register,
  errors,
  control,
  setValueRegister,
  list,
  action,
  changedData,
  getValueRegister,
}: IOtherInformationProp) => {
  const { setDisabledFields, disabledFields } = useContext(AppContext);
  setDisabledFields(action == "view" ? true : false);
  return (
    <div>
      <div className="grid-form-3-container gap-25 container-sections-forms ">
        <span className="text-black large bold grid-span-3-columns">
          Parafiscales
        </span>
        <SelectComponent
          idInput={"worker.eps"}
          control={control}
          errors={errors}
          data={list[0]}
          label={<>EPS</>}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.fundPension"}
          control={control}
          errors={errors}
          data={list[1]}
          label={<>Pension</>}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.arl"}
          control={control}
          errors={errors}
          data={list[2]}
          label={<>ARL</>}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.riskLevel"}
          control={control}
          errors={errors}
          data={list[3]}
          label={<>Riesgo</>}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.severanceFund"}
          control={control}
          errors={errors}
          data={list[4]}
          label={<>Riesgo</>}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
      </div>
      <div className="grid-form-3-container gap-25 container-sections-forms ">
        <span className="text-black large bold grid-span-3-columns">
          Datos bancarios
        </span>
        <InputComponent
          idInput={"worker.accountBankNumber"}
          label={<>No. de cuenta</>}
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.accountBankType"}
          control={control}
          errors={errors}
          data={list[5]}
          label={<>Tipo de cuenta</>}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.bank"}
          control={control}
          errors={errors}
          data={list[6]}
          label={<>Banco</>}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
      </div>
    </div>
  );
};

export default React.memo(AffiliationsForm);
