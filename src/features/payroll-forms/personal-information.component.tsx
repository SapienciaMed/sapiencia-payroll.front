import React from "react";
import { InputComponent } from "../../common/components/Form/input.component";
import { DatePickerComponent } from "../../common/components/Form/input-date.component";
import { EDirection } from "../../common/constants/input.enum";
import { InputGroupComponent } from "../../common/components/Form/input-group.component";
import { SelectComponent } from "../../common/components/Form/select.component";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface IPersonalInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  list: any[];
  stateList: React.Dispatch<React.SetStateAction<string>>[];
  setValueRegister: UseFormSetValue<any>;
}

const InformationPersonalForm = ({
  register,
  errors,
  control,
  list,
  stateList,
  setValueRegister,
}: IPersonalInformationProp) => {
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
              name="typeDocument"
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
                  onchange={field.onChange}
                  placeholder="Tipo"
                />
              )}
            />

            <InputGroupComponent
              idInput="numberDocument"
              className="input-group-basic medium"
              typeInput="text"
              register={register}
              classNameLabel="text-black big bold"
              direction={EDirection.row}
              errors={errors}
              placeholder={""}
              iconLegend={"No."}
              containerClassname="ml-5px big"
            />
          </div>
        </div>
        <InputComponent
          idInput={"firstName"}
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
        />
        <InputComponent
          idInput={"secondName"}
          label={<>Segundo nombre</>}
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />
        <InputComponent
          idInput={"surName"}
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
        />
        <InputComponent
          idInput={"secondSurname"}
          label="Segundo apellido"
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />

        <div className="display-justify gap-25">
          <Controller
            name="bloodType"
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
                onchange={field.onChange}
              />
            )}
          />
          <Controller
            name="gender"
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
                onchange={field.onChange}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="birthDate"
          render={({ field }) => {
            return (
              <DatePickerComponent
                id={field.name}
                idInput={"birthDate"}
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
              />
            );
          }}
        />
        <Controller
          name="nationality"
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
              onchange={field.onChange}
            />
          )}
        />
      </div>
      <div className="grid-form-4-container gap-25 container-sections-forms">
        <span className="text-black large bold grid-span-4-columns ">
          Información de localización
        </span>
        <Controller
          name="deparment"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Departamento"
              register={register}
              errors={errors}
              data={list[4]}
              setValue={stateList[0]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              onchange={field.onChange}
            />
          )}
        />
        <Controller
          name="municipality"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label="Municipio"
              register={register}
              errors={errors}
              data={list[5]}
              setValue={stateList[1]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              onchange={field.onChange}
            />
          )}
        />
        <Controller
          name="neighborhood"
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
              onchange={field.onChange}
            />
          )}
        />
        <InputComponent
          idInput="address"
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
        />
        <Controller
          name="socioEconomic"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
            <>
              Estrato <span>*</span>
            </>
          }
              register={register}
              errors={errors}
              data={list[7]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              onchange={field.onChange}
            />
          )}
        />
        <Controller
          name="housingType"
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
              onchange={field.onChange}
            />
          )}
        />
        <InputComponent
          idInput={"contactNumber"}
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
        />
        <InputComponent
          idInput={"email"}
          label="Correo electrónico"
          typeInput={"email"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />
        <div />
      </div>
    </>
  );
};

export default InformationPersonalForm;
