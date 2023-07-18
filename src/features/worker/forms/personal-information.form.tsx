import React, { useContext, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  SelectComponent,
  InputComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { InputGroupComponent } from "../../../common/components/Form/input-group.component";
import { EDirection } from "../../../common/constants/input.enum";
import { AppContext } from "../../../common/contexts/app.context";
import { IVinculation } from "../../../common/interfaces/payroll.interfaces";
import useEmploymentsData from "../hooks/employment.hook";

interface IPersonalInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  list: any[];
  stateList: React.Dispatch<React.SetStateAction<string>>[];
  setValueRegister: UseFormSetValue<any>;
  action: string;
  data: IVinculation;
  changedData: number;
  getValueRegister: UseFormGetValues<IVinculation>;
}

const InformationPersonalForm = ({
  register,
  errors,
  control,
  list,
  stateList,
  setValueRegister,
  action,
  data,
  changedData,
  getValueRegister,
}: IPersonalInformationProp) => {
  const { setDisabledFields, disabledFields } = useContext(AppContext);
  setDisabledFields(action == "view" ? true : false);
  return (
    <>
      <div className="grid-form-4-container gap-25 container-sections-forms">
        <span className="text-black large bold grid-span-4-columns">
          Datos personales
        </span>
        <div className="form-group column grid-span-4-columns">
          <label className="text-black big bold">
            Documento de identidad <span>*</span>
          </label>
          <div className="display-justify gap-15">
            <Controller
              name="worker.typeDocument"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  id={field.name}
                  idInput={field.name}
                  register={register}
                  errors={errors}
                  data={list[0]}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  value={field.value}
                  setValueRegister={setValueRegister}
                  getValueRegister={getValueRegister}
                  change={changedData}
                  onchange={field.onChange}
                  placeholder="Tipo"
                  disabled={disabledFields}
                />
              )}
            />

            <InputGroupComponent
              idInput="worker.numberDocument"
              className="input-group-basic medium"
              typeInput="text"
              register={register}
              classNameLabel="text-black big bold"
              direction={EDirection.row}
              errors={errors}
              placeholder={""}
              iconLegend={"No."}
              containerClassname="ml-5px big"
              disabled={disabledFields}
            />
          </div>
        </div>
        <InputComponent
          idInput={"worker.firstName"}
          label={
            <>
              Primer nombre <span>*</span>
            </>
          }
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
          disabled={disabledFields}
        />
        <InputComponent
          idInput={"worker.secondName"}
          label={<>Segundo nombre</>}
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
          disabled={disabledFields}
        />
        <InputComponent
          idInput={"worker.surname"}
          label={
            <>
              Primer apellido <span>*</span>
            </>
          }
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
          disabled={disabledFields}
        />
        <InputComponent
          idInput={"worker.secondSurname"}
          label="Segundo apellido"
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
          disabled={disabledFields}
        />

        <div className="fields-container gap-25">
          <Controller
            name="worker.bloodType"
            control={control}
            render={({ field }) => (
              <SelectComponent
                id={field.name}
                idInput={field.name}
                label={
                  <>
                    RH <span>*</span>
                  </>
                }
                register={register}
                errors={errors}
                data={list[1]}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                value={field.value}
                setValueRegister={setValueRegister}
                getValueRegister={getValueRegister}
                change={changedData}
                onchange={field.onChange}
                disabled={disabledFields}
              />
            )}
          />
          <Controller
            name="worker.gender"
            control={control}
            render={({ field }) => (
              <SelectComponent
                id={field.name}
                idInput={field.name}
                label={
                  <>
                    Genero <span>*</span>
                  </>
                }
                register={register}
                errors={errors}
                data={list[2]}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                value={field.value}
                setValueRegister={setValueRegister}
                getValueRegister={getValueRegister}
                change={changedData}
                onchange={field.onChange}
                disabled={disabledFields}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="worker.birthDate"
          render={({ field }) => {
            return (
              <DatePickerComponent
                id={field.name}
                idInput={field.name}
                value={field.value}
                label={
                  <>
                    Fecha de Nacimiento <span>*</span>
                  </>
                }
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
        <Controller
          name="worker.nationality"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Nacionalidad <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[3]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              disabled={disabledFields}
            />
          )}
        />
      </div>
      <div className="grid-form-4-container gap-25 container-sections-forms">
        <span className="text-black large bold grid-span-4-columns ">
          Información de localización
        </span>
        <Controller
          name="worker.department"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Departamento <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[4]}
              setValue={stateList[0]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              disabled={disabledFields}
            />
          )}
        />
        <Controller
          name="worker.municipality"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Municipio <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[5]}
              setValue={stateList[1]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              disabled={disabledFields}
            />
          )}
        />
        <Controller
          name="worker.neighborhood"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Barrio <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[6]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              disabled={disabledFields}
            />
          )}
        />
        <InputComponent
          idInput="worker.address"
          label={
            <>
              Direccion <span>*</span>
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
          name="worker.socioEconomic"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={<>Estrato</>}
              register={register}
              errors={errors}
              data={list[7]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              disabled={disabledFields}
            />
          )}
        />
        <Controller
          name="worker.housingType"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Tipo de vivienda"
              register={register}
              errors={errors}
              data={list[8]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              disabled={disabledFields}
            />
          )}
        />
        <InputComponent
          idInput={"worker.contactNumber"}
          label={
            <>
              Celular <span>*</span>
            </>
          }
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
          disabled={disabledFields}
        />
        <InputComponent
          idInput={"worker.email"}
          label="Correo electrónico"
          typeInput={"email"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
          disabled={disabledFields}
        />
        <div />
      </div>
    </>
  );
};

export default React.memo(InformationPersonalForm);
