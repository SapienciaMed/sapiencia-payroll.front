import React, { BaseSyntheticEvent } from "react";
import { Controller, Control, FormState } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import {
  ButtonComponent,
  FormComponent,
  // InputComponent,
  InputNumberComponent,
  LabelComponent,
  SelectComponent,
  TextAreaComponent,
} from "../../../common/components/Form";

import { ICharge } from "../../../common/interfaces/payroll.interfaces";
import { InputComponent } from "../../../common/components/Form/input-refactor.component";
import { EDirection } from "../../../common/constants/input.enum";

interface IPropsCreateUpdateChargeForm {
  control: Control<ICharge, any>;
  formState: FormState<ICharge>;
  action: string;
  redirectCancel: () => void;
  handleSubmitDeduction: (
    e?: BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
}

export const CreateUpdateChargeForm = ({
  control,
  formState,
  action,
  redirectCancel,
  handleSubmitDeduction,
}: IPropsCreateUpdateChargeForm): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <FormComponent className="form-signIn" action={handleSubmitDeduction}>
      <div className="container-sections-forms">
        <div className="grid-form-4-container gap-25">
          <SelectComponent
            idInput={"typeCharge"}
            control={control}
            errors={errors}
            data={[]}
            label={
              <>
                Tipo de cargo. <span>*</span>
              </>
            }
            className="select-basic medium"
            classNameLabel="text-black big bold"
            placeholder="Seleccione."
            filter={true}
            disabled={action === "edit" ? true : false}
          />

          <InputComponent
            control={control}
            idInput={"name"}
            typeInput="text"
            className="input-basic medium"
            label={
              <>
                Cargo/Perfil <span>*</span>
              </>
            }
            classNameLabel="text-black big bold"
            disabled={action === "edit" ? true : false}
          />

          <InputNumberComponent
            idInput="baseSalary"
            control={control}
            label={
              <>
                Ingreso base mensual <span>*</span>
              </>
            }
            errors={errors}
            classNameLabel="text-black big bold"
            className="inputNumber-basic medium"
            mode="currency"
            currency="COP"
            locale="es-CO"
            minFractionDigits={2}
            maxFractionDigits={2}
          />

          <div className="check-label mt-25">
            <InputComponent
              control={control}
              direction={EDirection.row}
              idInput={"state"}
              typeInput="checkbox"
              className="checkbox-basic"
              classNameLabel="text-black big bold"
              disabled={action === "edit" ? true : false}
            >
              <LabelComponent
                value="Activo"
                className="text-black big bold"
                htmlFor="state"
              />
            </InputComponent>
          </div>

          <div className="grid-span-4-columns">
            <Controller
              control={control}
              name={"observations"}
              shouldUnregister={true}
              render={({ field }) => {
                return (
                  <TextAreaComponent
                    idInput={field.name}
                    className="text-area-basic"
                    classNameLabel="text-black big bold"
                    label="Observaciones"
                    errors={errors}
                    rows={5}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                  />
                );
              }}
            />
            <div className="text-right">
              <span className="text-span ">Max. {500} caracteres</span>
            </div>
          </div>
        </div>
      </div>
      <div className="button-save-container-display m-top-20">
        <ButtonComponent
          value={"Cancelar"}
          className="button-clean bold"
          type="button"
          action={redirectCancel}
        />
        <ButtonComponent
          value={`${action === "edit" ? "Editar" : "Guardar"}`}
          className="button-save large disabled-black"
          disabled={!isValid}
        />
      </div>
    </FormComponent>
  );
};
