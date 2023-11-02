import React from "react";
import {
  FormComponent,
  SelectComponent,
  ButtonComponent,
} from "../../../common/components/Form";

import { Control, Controller, FieldValues, FormState } from "react-hook-form";

import { IFilterOtherIncome } from "../../../common/interfaces/payroll.interfaces";

interface IPropsFilterOtherIncomeForm {
  control: Control<any, any>;
  formState: FormState<FieldValues>;
  activeWorkerList: any[];
  periodsList: any[];
  formValues: IFilterOtherIncome;
  clearFields: () => void;
  onSubmit: () => Promise<void>;
}

export const FilterOtherIncomeForm = ({
  onSubmit,
  clearFields,
  control,
  formState,
  formValues,
  activeWorkerList,
  periodsList,
}: IPropsFilterOtherIncomeForm): React.JSX.Element => {
  const { codPayroll } = formValues;
  const { errors } = formState;

  return (
    <>
      <FormComponent className="form-signIn" action={onSubmit}>
        <div className="container-sections-forms">
          <div className="grid-form-2-container gap-25">
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
              filter={true}
              placeholder="Seleccione."
            />

            <SelectComponent
              idInput={"codEmployment"}
              control={control}
              errors={errors}
              data={activeWorkerList}
              label={<>Documento - Nombre del empleado.</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              filter={true}
              placeholder="Seleccione."
            />
          </div>

          <div className="button-save-container-display m-top-20">
            <ButtonComponent
              value={"Limpiar campos"}
              className="button-clean bold"
              type="button"
              action={clearFields}
            />
            <ButtonComponent
              value={"Buscar"}
              className="button-save disabled-black big"
              disabled={!codPayroll}
            />
          </div>
        </div>
      </FormComponent>
    </>
  );
};
