import React, { BaseSyntheticEvent } from "react";
import { Controller, Control, FormState } from "react-hook-form";

import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  InputNumberComponent,
  LabelComponent,
  SelectComponent,
  TextAreaComponent,
} from "../../../common/components/Form";

import { IManualDeduction } from "../../../common/interfaces/payroll.interfaces";
import { EDeductionns } from "../../../common/constants/deductions.enum";
import { EDirection } from "../../../common/constants/input.enum";

interface IPropsCreateUpdateDeductionsForm {
  control: Control<IManualDeduction, any>;
  formState: FormState<IManualDeduction>;
  typeDeduction: string;
  porcentualValue: boolean;
  activeWorkerList: any[];
  typeDeductionList: any[];
  deductionsTypeByTypeList: any[];
  lastPeriodsList: any[];
  redirectCancel: () => void;
  handleSubmitDeduction: (
    e?: BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
}

export const CreateUpdateDeductionsForm = ({
  control,
  formState,
  typeDeduction,
  porcentualValue,
  activeWorkerList,
  typeDeductionList,
  deductionsTypeByTypeList,
  lastPeriodsList,
  redirectCancel,
  handleSubmitDeduction,
}: IPropsCreateUpdateDeductionsForm): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <>
      <FormComponent className="form-signIn" action={handleSubmitDeduction}>
        <div className="container-sections-forms">
          <div className="grid-form-3-container gap-25">
            <SelectComponent
              idInput={"codEmployment"}
              control={control}
              errors={errors}
              data={activeWorkerList}
              label={
                <>
                  Documento - Nombre del empleado. <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
              filter={true}
            />
            <SelectComponent
              idInput={"typeDeduction"}
              control={control}
              errors={errors}
              data={typeDeductionList}
              label={
                <>
                  Tipo de deducción <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />

            {typeDeduction === EDeductionns.Eventuales && (
              <>
                <SelectComponent
                  idInput={"codDeductionType"}
                  control={control}
                  errors={errors}
                  data={deductionsTypeByTypeList}
                  label={
                    <>
                      Tipo de eventuales <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                />
                <SelectComponent
                  idInput={"codFormsPeriod"}
                  control={control}
                  errors={errors}
                  data={lastPeriodsList}
                  label={
                    <>
                      Periodo planilla <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                />

                <Controller
                  control={control}
                  name={"porcentualValue"}
                  render={({ field }) => {
                    return (
                      <div className="check-label mt-25">
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

                {!porcentualValue ? (
                  <InputNumberComponent
                    idInput="value"
                    control={control}
                    label={
                      <>
                        Valor deducción <span>*</span>
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
                ) : (
                  <InputNumberComponent
                    idInput="value"
                    control={control}
                    label={
                      <>
                        Porcentaje de deducción <span>*</span>
                      </>
                    }
                    errors={errors}
                    classNameLabel="text-black big bold"
                    className="inputNumber-basic medium"
                    prefix="%"
                    mode="decimal"
                    useGrouping={true}
                    minFractionDigits={1}
                    maxFractionDigits={3}
                  />
                )}

                <div className="grid-span-3-columns">
                  <Controller
                    control={control}
                    name={"observation"}
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
              </>
            )}

            {typeDeduction === EDeductionns.Ciclica && (
              <>
                <SelectComponent
                  idInput={"codDeductionType"}
                  control={control}
                  errors={errors}
                  data={deductionsTypeByTypeList}
                  label={
                    <>
                      Tipo cíclicas <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                />

                <Controller
                  control={control}
                  name={"porcentualValue"}
                  render={({ field }) => {
                    return (
                      <div className="check-label mt-25">
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

                {!porcentualValue ? (
                  <>
                    <InputNumberComponent
                      idInput="totalMount"
                      control={control}
                      label={
                        <>
                          Valor total deducción <span>*</span>
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

                    <InputNumberComponent
                      idInput="numberInstallments"
                      control={control}
                      label={
                        <>
                          NO de cuotas <span>*</span>
                        </>
                      }
                      errors={errors}
                      classNameLabel="text-black big bold"
                      className="inputNumber-basic medium"
                      prefix=""
                      mode="decimal"
                      useGrouping={false}
                      minFractionDigits={0}
                      maxFractionDigits={0}
                    />
                    <InputNumberComponent
                      idInput="value"
                      control={control}
                      label={
                        <>
                          Valor por cuota <span>*</span>
                        </>
                      }
                      errors={errors}
                      classNameLabel="text-black big bold"
                      className="inputNumber-basic medium"
                      mode="currency"
                      currency="COP"
                      locale="es-CO"
                      disabled={true}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                    />
                  </>
                ) : (
                  <InputNumberComponent
                    idInput="value"
                    control={control}
                    label={
                      <>
                        Porcentaje de deducción <span>*</span>
                      </>
                    }
                    errors={errors}
                    classNameLabel="text-black big bold"
                    className="inputNumber-basic medium"
                    prefix="%"
                    mode="decimal"
                    useGrouping={true}
                    minFractionDigits={1}
                    maxFractionDigits={3}
                  />
                )}

                <Controller
                  control={control}
                  name={"applyExtraordinary"}
                  render={({ field }) => {
                    return (
                      <div className="check-label mt-25">
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
                            value="Aplica extraordinario"
                            className="text-black big bold"
                            htmlFor="porcentaje"
                          />
                        </InputComponent>
                      </div>
                    );
                  }}
                />

                <SelectComponent
                  idInput={"codFormsPeriod"}
                  control={control}
                  errors={errors}
                  data={lastPeriodsList}
                  label={
                    <>
                      Periodo planilla <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                />

                <div className="grid-span-3-columns">
                  <Controller
                    control={control}
                    name={"observation"}
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
              </>
            )}
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
            value={"Guardar"}
            className="button-save large disabled-black"
            disabled={!isValid}
          />
        </div>
      </FormComponent>
    </>
  );
};
