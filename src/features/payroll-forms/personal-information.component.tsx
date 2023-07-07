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
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any>;
  list: any[];
  stateList: React.Dispatch<React.SetStateAction<string>>[];
  setValueRegister: UseFormSetValue<FieldValues>;
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
            <SelectComponent
              idInput="typeDocument"
              register={register}
              className="select-basic medium"
              placeholder="Tipo"
              data={list[0]}
              value={null}
              classNameLabel="text-black big bold"
              direction={EDirection.column}
              errors={errors}
              setValueRegister={setValueRegister}
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
          <SelectComponent
            idInput="bloodType"
            label="RH"
            register={register}
            errors={errors}
            data={list[1]}
            className="select-basic medium"
            classNameLabel="text-black big bold"
            setValueRegister={setValueRegister}
          />
          <SelectComponent
            idInput="gender"
            label="Género"
            register={register}
            errors={errors}
            data={list[2]}
            className="select-basic medium"
            classNameLabel="text-black big bold"
            setValueRegister={setValueRegister}
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
                label="Fecha de Nacimiento"
                register={register}
                errors={errors}
                classNameLabel="text-black big bold"
                setValueRegister={setValueRegister}
                onchange={field.onChange}
                className="select-basic medium"
              />
            );
          }}
        />

        <SelectComponent
          idInput="nationality"
          label="Nacionalidad"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          data={list[3]}
          setValueRegister={setValueRegister}
        />
      </div>
      <div className="grid-form-4-container gap-25 container-sections-forms">
        <span className="text-black large bold grid-span-4-columns ">
          Información de localización
        </span>
        <SelectComponent
          idInput="country"
          label="País"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          data={list[3]}
          setValueRegister={setValueRegister}
        />
        <SelectComponent
          idInput="deparment"
          label="Departamento"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          data={list[4]}
          setValue={stateList[0]}
          setValueRegister={setValueRegister}
        />
        <SelectComponent
          idInput="municipality"
          label="Municipio"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          data={list[5]}
          setValue={stateList[1]}
          setValueRegister={setValueRegister}
        />
        <InputComponent
          idInput="address"
          label="Dirección"
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />
        <SelectComponent
          idInput="neighborhood"
          label="Barrio"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          data={list[6]}
          setValueRegister={setValueRegister}
        />
        <SelectComponent
          idInput="socioEconomic"
          label="Estrato"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          data={list[7]}
          setValueRegister={setValueRegister}
        />
        <InputComponent
          idInput={"contactNumber"}
          label="Celular"
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />
        <SelectComponent
          idInput="housingType"
          label="Tipo de vivienda"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          data={list[8]}
          setValueRegister={setValueRegister}
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
