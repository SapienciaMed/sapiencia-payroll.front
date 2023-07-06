import React from "react";
import { InputComponent } from "../../common/components/Form/input.component";
import { DatePickerComponent } from "../../common/components/Form/input-date.component";
import { EDirection } from "../../common/constants/input.enum";
import { InputGroupComponent } from "../../common/components/Form/input-group.component";
import { SelectComponent } from "../../common/components/Form/select.component";

const InformationPersonalForm = ({ register, errors }: any) => {
  return (
    <div>
      <div className="grid-form-4-container container-sections-forms">
        <span className="text-black large bold grid-span-4-columns">
          Datos personales
        </span>
        <div className="form-group column">
          <label className="text-black big bold">Documento de identidad</label>
          <div className="display-justify-space-between">
            <SelectComponent
              idInput="typeDocument"
              register={register}
              className="select-basic medium"
              placeholder="Tipo"
              data={[]}
              value={null}
              classNameLabel="text-black big bold"
              direction={EDirection.column}
              errors={errors}
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
          label="Primer nombre"
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />
        <InputComponent
          idInput={"secondName"}
          label="Segundo nombre"
          typeInput={"text"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />
        <InputComponent
          idInput={"surName"}
          label="Primer apellido"
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
        <div className="display-justify-space-between">
          <SelectComponent
            idInput="bloodType"
            label="RH"
            register={register}
            errors={errors}
            className="select-basic medium"
            classNameLabel="text-black big bold"
          />
          <SelectComponent
            idInput="gender"
            label="Género"
            register={register}
            errors={errors}
            className="select-basic medium"
            classNameLabel="text-black big bold"
          />
        </div>
        <DatePickerComponent
          idInput="birthDate"
          label="Fecha de Nacimiento"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
        />
        <SelectComponent
          idInput="nacionality"
          label="Nacionalidad"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
        />
      </div>
      <div className="grid-form-4-container container-sections-forms">
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
        />
        <SelectComponent
          idInput="deparment"
          label="Departamento"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
        />
        <SelectComponent
          idInput="town"
          label="Ciudad"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
        />
        <InputComponent
          idInput={"adress"}
          label="Dirección"
          typeInput={"text"}
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
        />
        <SelectComponent
          idInput="neighborhood"
          label="Barrio"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
        />
        <SelectComponent
          idInput="status"
          label="Estrato"
          register={register}
          errors={errors}
          className="select-basic medium"
          classNameLabel="text-black big bold"
        />
        <InputComponent
          idInput={"cellphone"}
          label="Celular"
          typeInput={"number"}
          register={register}
          errors={errors}
          className="input-basic medium"
          classNameLabel="text-black big bold"
        />
        <SelectComponent
          idInput="typeHousing"
          label="Tipo de vivienda"
          register={register}
          errors={errors}
          className="select-basic medium"
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
      </div>
    </div>
  );
};

export default InformationPersonalForm;
