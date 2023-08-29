import React from "react";

import {
  FormComponent,
  SelectComponent,
  InputComponent,
  InputNumberComponent,
  ButtonComponent,
  LabelComponent,
  TextAreaComponent,
  DatePickerComponent,
} from "../../../common/components/Form";

import {
  Control,
  FieldValues,
  FormState,
  UseFormRegister,
  Controller,
} from "react-hook-form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { EDirection } from "../../../common/constants/input.enum";

import { ISalaryIncrement } from "../../../common/interfaces/payroll.interfaces";

interface IPropsCreateUpdateIncremetSalary {
  register: UseFormRegister<any>;
  control: Control<ISalaryIncrement, any>;
  formState: FormState<FieldValues>;
  redirectCancel: () => void;
  onSubmit: () => Promise<void>;
  chargesState: IDropdownProps[];
  percentageValue: boolean;
  idChargeValue: number;
  action?: string;
}

let render = 0;

export const CreateUpdateIncrementSalaryForm = ({
  register,
  control,
  formState,
  redirectCancel,
  onSubmit,
  chargesState,
  percentageValue,
  idChargeValue,
  action,
}: IPropsCreateUpdateIncremetSalary): React.JSX.Element => {
  render++;

  const { errors, isValid } = formState;

  return (
    <FormComponent
      id="createUpdateIncrementSalary"
      className="form-signIn"
      action={onSubmit}
    >
      <div className="container-sections-forms">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Información actual
          </label>
        </div>

        <div>
          <div className="grid-form-2-container gap-25">
            <SelectComponent
              idInput={"codCharge"}
              control={control}
              errors={errors}
              data={chargesState}
              label={
                <>
                  Cargo <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />

            <InputNumberComponent
              idInput="previousSalary"
              control={control}
              label={<>Salario actual</>}
              errors={errors}
              classNameLabel="text-black big bold"
              className="inputNumber-basic medium"
              disabled={true}
              mode="currency"
              currency="COP"
              locale="es-CO"
              minFractionDigits={2}
              maxFractionDigits={2}
            />
          </div>
        </div>
      </div>
      {idChargeValue && (
        <>
          <div className="container-sections-forms">
            <div className="title-area">
              <label className="text-black extra-large bold">
                Actualizar incremento de salario
              </label>
            </div>

            <div>
              <div
                className={`${
                  percentageValue
                    ? "grid-form-4-container gap-25"
                    : "grid-form-3-container gap-25"
                }`}
              >
                <Controller
                  control={control}
                  name={"numberActApproval"}
                  shouldUnregister={true}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        typeInput={"text"}
                        label={
                          <>
                            Número de acta de aprobación <span>*</span>
                          </>
                        }
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="input-basic medium"
                        classNameLabel="text-black big bold"
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  name={"porcentualIncrement"}
                  shouldUnregister={true}
                  render={({ field }) => {
                    return (
                      <div className="check-increment_porcentaje">
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
                            value="Porcentaje"
                            className="text-black big bold"
                            htmlFor="porcentaje"
                          />
                        </InputComponent>
                      </div>
                    );
                  }}
                />

                {percentageValue && (
                  <InputNumberComponent
                    idInput="porcentualValue"
                    control={control}
                    label={<>Porcentaje del incremento</>}
                    errors={errors}
                    classNameLabel="text-black big bold"
                    className="inputNumber-basic medium"
                    prefix="%"
                    useGrouping={false}
                  />
                )}

                <InputNumberComponent
                  idInput="newSalary"
                  control={control}
                  label={
                    <>
                      Nuevo salario <span>*</span>
                    </>
                  }
                  errors={errors}
                  classNameLabel="text-black big bold"
                  className="inputNumber-basic medium"
                  disabled={percentageValue}
                  mode="currency"
                  currency="COP"
                  locale="es-CO"
                  minFractionDigits={2}
                  maxFractionDigits={2}
                  shouldUnregister={true}
                />
              </div>
            </div>
            <div>
              <div className="grid-form-2-container gap-25 p-top-20">
                <DatePickerComponent
                  idInput={"effectiveDate"}
                  control={control}
                  label={
                    <>
                      Fecha efectiva <span>*</span>
                    </>
                  }
                  errors={errors}
                  classNameLabel="text-black big bold"
                  className="dataPicker-basic  medium "
                  // disabled={disabledFields}
                  placeholder="DD/MM/YYYY"
                  dateFormat="dd/mm/yy"
                  minDate={new Date()}
                  shouldUnregister={true}
                />

                <InputNumberComponent
                  idInput="incrementValue"
                  control={control}
                  label={
                    <>
                      Incremento <span>*</span>
                    </>
                  }
                  errors={errors}
                  classNameLabel="text-black big bold"
                  className="inputNumber-basic medium"
                  disabled={true}
                  mode="currency"
                  currency="COP"
                  locale="es-CO"
                  minFractionDigits={2}
                  maxFractionDigits={2}
                />
              </div>
            </div>
          </div>
          <div className=" grid-span-3-columns">
            <TextAreaComponent
              idInput={"observation"}
              className="text-area-basic"
              classNameLabel="text-black big bold"
              label="Observaciones"
              register={register}
              disabled={false}
              errors={errors}
              rows={5}
              optionsRegister={{ shouldUnregister: true }}
            />
            <div className="text-right">
              <span className="text-span ">Max. {500} carácteres</span>
            </div>
          </div>
        </>
      )}
      <div className="button-save-container-display m-top-20">
        <ButtonComponent
          value={"Cancelar"}
          className="button-clean bold"
          type="button"
          action={redirectCancel}
        />
        <ButtonComponent
          value={action === "edit" ? "Editar" : "Guardar"}
          className="button-save disabled-black big"
          type="submit"
          disabled={!isValid}
        />
      </div>
    </FormComponent>
  );
};
