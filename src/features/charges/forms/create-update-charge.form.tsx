import React from "react";
import { Control, Controller, FormState } from "react-hook-form";
import {
  FormComponent,
  SelectComponent,
  InputComponent,
  TextAreaComponent,
  ButtonComponent,
  InputNumberComponent,
  LabelComponent,
} from "../../../common/components/Form";

import { ICharge } from "../../../common/interfaces/payroll.interfaces";
import { EDirection } from "../../../common/constants/input.enum";

interface IPropsCreateUpdateChargeForm {
  action: string;
  control: Control<ICharge, any>;
  formState: FormState<ICharge>;
  typesChargesList: any[];
  typesContractsList: any[];
  handleSubmitCharge: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
  redirectCancel: () => void;
}

export const CreateUpdateChargeForm = ({
  action,
  control,
  formState,
  typesChargesList,
  typesContractsList,
  handleSubmitCharge,
  redirectCancel,
}: IPropsCreateUpdateChargeForm): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <div className="container-sections-forms">
      <FormComponent
        id="createOrUpdateCharge"
        className="form-signIn"
        action={handleSubmitCharge}
      >
        <div className="grid-form-3-container gap-25">
          <SelectComponent
            idInput={"codChargeType"}
            control={control}
            errors={errors}
            data={typesChargesList}
            label={
              <>
                Tipo de cargo <span>*</span>
              </>
            }
            className="select-basic medium"
            classNameLabel="text-black big bold"
            placeholder="Seleccione."
            disabled={action === "edit"}
          />
          <Controller
            control={control}
            name={"name"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={errors}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  label={
                    <>
                      Cargo/Perfil <span>*</span>
                    </>
                  }
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  typeInput={""}
                  disabled={action === "edit"}
                />
              );
            }}
          />
          <SelectComponent
            idInput={"codContractType"}
            control={control}
            errors={errors}
            data={typesContractsList}
            label={
              <>
                Tipo de contrato <span>*</span>
              </>
            }
            className="select-basic medium"
            classNameLabel="text-black big bold"
            placeholder="Seleccione."
            disabled={action === "edit"}
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
          <Controller
            control={control}
            name={"state"}
            shouldUnregister={true}
            render={({ field }) => {
              return (
                <div className="check-label">
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    typeInput={"checkbox"}
                    direction={EDirection.row}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    checked={field.value}
                    className="checkbox-basic"
                    classNameLabel="text-black big bold"
                  >
                    <LabelComponent
                      value="Activo"
                      className="text-black big bold"
                      htmlFor="state"
                    />
                  </InputComponent>
                </div>
              );
            }}
          />

          <div className="grid-span-3-columns">
            <Controller
              control={control}
              name={"observations"}
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
    </div>
  );
};
