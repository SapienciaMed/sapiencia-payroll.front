import React, { useContext } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import {
  SelectComponent,
  InputComponent,
} from "../../../common/components/Form";

import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { InputGroupComponent } from "../../../common/components/Form/input-group.component";
import { EDirection } from "../../../common/constants/input.enum";
import { AppContext } from "../../../common/contexts/app.context";

interface IPersonalInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  list: any[];
  action: string;
}

const InformationPersonalForm = ({
  register,
  errors,
  control,
  list,
  action,
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
            <SelectComponent
              idInput={"worker.typeDocument"}
              control={control}
              errors={errors}
              data={list[0]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
              disabled={disabledFields}
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
          <SelectComponent
            idInput={"worker.bloodType"}
            control={control}
            errors={errors}
            data={list[1]}
            label={
              <>
                RH <span>*</span>
              </>
            }
            className="select-basic medium"
            classNameLabel="text-black big bold"
            placeholder="Seleccione."
            disabled={disabledFields}
          />
          <SelectComponent
            idInput={"worker.gender"}
            control={control}
            errors={errors}
            data={list[2]}
            label={
              <>
                Genero <span>*</span>
              </>
            }
            className="select-basic medium"
            classNameLabel="text-black big bold"
            placeholder="Seleccione."
            disabled={disabledFields}
          />
        </div>
        <DatePickerComponent
          idInput={"worker.birthDate"}
          control={control}
          label={
            <>
              Fecha de Nacimiento <span>*</span>
            </>
          }
          errors={errors}
          classNameLabel="text-black big bold"
          className="dataPicker-basic  medium "
          disabled={disabledFields}
          placeholder="DD/MM/YYYY"
          dateFormat="dd/mm/yy"
          maxDate={new Date()}
        />
        <SelectComponent
          idInput={"worker.nationality"}
          control={control}
          errors={errors}
          data={list[3]}
          label={
            <>
              Nacionalidad <span>*</span>
            </>
          }
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
      </div>
      <div className="grid-form-4-container gap-25 container-sections-forms">
        <span className="text-black large bold grid-span-4-columns ">
          Información de localización
        </span>
        <SelectComponent
          idInput={"worker.department"}
          control={control}
          errors={errors}
          data={list[4]}
          label={
            <>
              Departamento <span>*</span>
            </>
          }
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.municipality"}
          control={control}
          errors={errors}
          data={list[5]}
          label={
            <>
              Municipio <span>*</span>
            </>
          }
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.neighborhood"}
          control={control}
          errors={errors}
          data={list[6]}
          label={
            <>
              Barrio <span>*</span>
            </>
          }
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
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
        <SelectComponent
          idInput={"worker.socioEconomic"}
          control={control}
          errors={errors}
          data={list[7]}
          label={<>Estrato</>}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
        />
        <SelectComponent
          idInput={"worker.housingType"}
          control={control}
          errors={errors}
          data={list[8]}
          label={"Tipo de vivienda"}
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          disabled={disabledFields}
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
