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

import { EDirection } from "../../../common/constants/input.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";

interface IPropsCreateUpdateDeductionsForm {
  control: Control<any, any>;
  formState: FormState<any>;
  activeWorkerList: any[];
  periodsList: any[];
  typeIncomeByTypeList: IDropdownProps[];
  action: string;
  redirectCancel: () => void;
  handleSubmitOtherIncome: (
    e?: BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
}

export const CreateUpdateOtherIncomeForm = ({
  control,
  formState,
  activeWorkerList,
  periodsList,
  typeIncomeByTypeList,
  action,
  redirectCancel,
  handleSubmitOtherIncome,
}: IPropsCreateUpdateDeductionsForm): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <>
      <FormComponent className="form-signIn" action={handleSubmitOtherIncome}>
        <div className="container-sections-forms">
          <div className="grid gap-25">
            <div className="grid-form-3-container gap-25">
              <SelectComponent
                idInput={"codPayroll"}
                control={control}
                errors={errors}
                data={periodsList}
                label={
                  <>
                    Periodo de planilla <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                filter={true}
                // disabled={action === "edit" ? true : false}
              />

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
                // disabled={action === "edit" ? true : false}
              />

              <SelectComponent
                idInput={"codTypeIncome"}
                control={control}
                errors={errors}
                data={typeIncomeByTypeList}
                label={
                  <>
                    Tipo de ingresos<span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                // disabled={action === "edit" ? true : false}
              />
            </div>

            <div className="grid-form-3-container gap-25">
              <InputNumberComponent
                idInput="value"
                control={control}
                label={
                  <>
                    Valor <span>*</span>
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
                render={({ field }) => {
                  return (
                    <InputComponent
                      idInput={field.name}
                      errors={errors}
                      typeInput={"text"}
                      direction={EDirection.column}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic medium"
                      classNameLabel="text-black big bold"
                      disabled={true}
                      label={<>Estado</>}
                    />
                  );
                }}
              />
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
  );
};
