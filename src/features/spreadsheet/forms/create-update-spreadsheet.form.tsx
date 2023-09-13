import React from "react";
import { Control, Controller, FormState } from "react-hook-form";

import {
  FormComponent,
  SelectComponent,
  DatePickerComponent,
  InputComponent,
  TextAreaComponent,
  ButtonComponent,
} from "../../../common/components/Form";

import { IFormPeriod } from "../../../common/interfaces/payroll.interfaces";

interface IPropsCreateUpdateSpreadSheetForm {
  action: string;
  control: Control<IFormPeriod, any>;
  formState: FormState<IFormPeriod>;
  typesSpreadSheetList: any[];
  monthList: any[];
  handleSubmitSpreadSheet: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
  redirectCancel: () => void;
}

export const CreateUpdateSpreadSheetForm = ({
  action,
  control,
  formState,
  typesSpreadSheetList,
  monthList,
  handleSubmitSpreadSheet,
  redirectCancel,
}: IPropsCreateUpdateSpreadSheetForm): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <div className="container-sections-forms">
      <>
        <FormComponent
          id="createOrUpdateSpreadSheet"
          className="form-signIn"
          action={handleSubmitSpreadSheet}
        >
          <div className="grid-form-3-container gap-25">
            <SelectComponent
              idInput={"idFormType"}
              control={control}
              errors={errors}
              data={typesSpreadSheetList}
              label={
                <>
                  Tipo de planilla <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />

            <SelectComponent
              idInput={"month"}
              control={control}
              errors={errors}
              data={monthList}
              label={
                <>
                  Mes <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />

            <Controller
              control={control}
              name={"year"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    typeInput={"text"}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    label={
                      <>
                        Año <span>*</span>
                      </>
                    }
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />
                );
              }}
            />

            <DatePickerComponent
              idInput={"dateStart"}
              control={control}
              label={
                <>
                  Fecha inicio <span>*</span>
                </>
              }
              errors={errors}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
            />

            <DatePickerComponent
              idInput={"dateEnd"}
              control={control}
              label={
                <>
                  Fecha fin <span>*</span>
                </>
              }
              errors={errors}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
            />

            <DatePickerComponent
              idInput={"paidDate"}
              control={control}
              label={
                <>
                  Fecha pago <span>*</span>
                </>
              }
              errors={errors}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
            />

            <div className="grid-span-3-columns">
              <Controller
                control={control}
                name={"observation"}
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
      </>
    </div>
  );
};
