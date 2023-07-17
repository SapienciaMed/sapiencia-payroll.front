import React, { useContext, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  SelectComponent,
  InputComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import TableComponent from "../../../common/components/table.component";
import { AppContext } from "../../../common/contexts/app.context";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import useEmploymentsData from "../hooks/employment.hook";

interface IContractualInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  setValueRegister: UseFormSetValue<any>;
  list: any[][];
  action: string;
}

const ContractualInformationForm = ({
  register,
  errors,
  control,
  setValueRegister,
  list,
  action,
}: IContractualInformationProp) => {
  const { setDisabledFields, disabledFields } = useContext(AppContext);
  setDisabledFields(action == "new" ? false : true);
  const [antiquity, setAntiquity] = useState("0");
  const {typesChargesSelected,
    setTypesChargesSelected,
    typesContractsSelected,
    setTypesContractsSelected,
    activeWorkerSelected,
    setActiveWorkerSelected
  } = useEmploymentsData({ action });
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
              disabled={disabledFields}
              stateProps={{
                state: typesContractsSelected,
                setState: setTypesContractsSelected,
              }}
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
          disabled={disabledFields}
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
              disabled={disabledFields}
              stateProps={{
                state: activeWorkerSelected,
                setState: setActiveWorkerSelected,
              }}
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
              disabled={disabledFields}
              stateProps={{
                state: typesChargesSelected,
                setState: setTypesChargesSelected,
              }}
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
                disabled={disabledFields}
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
                disabled={disabledFields}
              />
            );
          }}
        />
        {action !== "new" ?(<InputComponent
          idInput="antiquity"
          typeInput="text"
          label="Antiguedad"
          errors={errors}
          value={antiquity ? antiquity : "0"}
          classNameLabel="text-black big bold"
          className="input-basic medium"
          disabled={true}
        />):<></>}
        
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
          disabled={disabledFields}
        />

        {true ? (
          <InputComponent
            idInput="employment.salary"
            typeInput="text"
            label={<>Salario</>}
            register={register}
            errors={errors}
            classNameLabel="text-black big bold"
            className="input-basic medium"
            disabled={disabledFields}
          />
        ) : (
          <>
            <InputComponent
              idInput="employment.totalValue"
              typeInput="text"
              label={<>Valor total</>}
              register={register}
              errors={errors}
              classNameLabel="text-black big bold"
              className="input-basic medium"
              disabled={disabledFields}
            />
            <div className="grid-span-4-columns">
              <TextAreaComponent
                label={"Observaciones"}
                idInput={"observation"}
                disabled={disabledFields}
                className="text-area-basic"
                classNameLabel="text-black big bold"
                register={register}
                errors={errors}
                rows={5}
              />
            </div>
          </>
        )}
      </div>
      {action !== "new" ? (
        <div className="container-sections-forms">
        <TableComponent url={""} columns={[]} isShowModal={false} />
      </div>) :(<></>)
      }
      
    </div>
  );
};

export default React.memo(ContractualInformationForm);
