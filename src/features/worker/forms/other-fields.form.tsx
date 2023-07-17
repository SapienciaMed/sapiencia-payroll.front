import React, { useContext } from "react";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { SelectComponent } from "../../../common/components/Form/select.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { AppContext } from "../../../common/contexts/app.context";
import useEmploymentsData from "../hooks/employment.hook";

interface IOtherInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  list: any[];
  setValueRegister: UseFormSetValue<any>;
  action: string;
}

const AffiliationsForm = ({
  register,
  errors,
  control,
  setValueRegister,
  list,
  action
}: IOtherInformationProp) => {
  const { setDisabledFields, disabledFields } = useContext(AppContext);
  setDisabledFields(action == "view" ? true : false )
  const {
    epsSelected,
    setEpsSelected,
    arlSelected,
    setArlSelected,
    pensionSelected,
    setPensionSelected,
    layoffSelected,
    setLayoffSelected,
    levelRiskSelected,
    setLevelRiskSelected,
    typeBankAccountSelected,
    setTypeBankAccountSelected,
    bankSelected,
    setBankSelected,
    } = useEmploymentsData({ action });
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
              stateProps={{
                state: epsSelected,
                setState: setEpsSelected,
              }}
              disabled={disabledFields}
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
              stateProps={{
                state: pensionSelected,
                setState: setPensionSelected,
              }}
              disabled={disabledFields}
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
              stateProps={{
                state: arlSelected,
                setState: setArlSelected,
              }}
              disabled={disabledFields}
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
              stateProps={{
                state: levelRiskSelected,
                setState: setLevelRiskSelected,
              }}
              disabled={disabledFields}
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
              stateProps={{
                state: layoffSelected,
                setState: setLayoffSelected,
              }}
              disabled={disabledFields}
            />
          )}
        />
      </div>
      <div className="grid-form-3-container gap-25 container-sections-forms ">
        <span className="text-black large bold grid-span-3-columns">
          Datos bancarios
        </span>
        <InputComponent
          idInput={"worker.accountBankNumber"}
          label={
            <>
              No. de cuenta
            </>
          }
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
          disabled={disabledFields}
        />
        <Controller
          name="worker.accountBankType"
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
              stateProps={{
                state: typeBankAccountSelected,
                setState: setTypeBankAccountSelected,
              }}
              disabled={disabledFields}
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
              stateProps={{
                state: bankSelected,
                setState: setBankSelected,
              }}
              disabled={disabledFields}
            />
          )}
        />
      </div>
    </div>
  );
};

export default React.memo(AffiliationsForm);
