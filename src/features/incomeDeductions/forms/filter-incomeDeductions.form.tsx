import React from "react";
import {
  FormComponent,
  SelectComponent,
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";

import { Control, Controller, FieldValues, FormState } from "react-hook-form";
import { IFilterTaxDeductible } from "../../../common/interfaces/payroll.interfaces";

interface IPropsFilterIncomeDeductionsForm {
  control: Control<any, any>;
  formState: FormState<FieldValues>;
  activeWorkerList: any[];
  formValues: IFilterTaxDeductible;
  clearFields: () => void;
  onSubmit: () => Promise<void>;
}

export const FilterIncomeDeductionsForm = ({
  onSubmit,
  clearFields,
  control,
  formState,
  formValues,
  activeWorkerList,
}: IPropsFilterIncomeDeductionsForm): React.JSX.Element => {
  const { year } = formValues;
  return (
    <>
      <FormComponent
        className="form-signIn"
        id="searchTaxDeduction"
        action={onSubmit}
      >
        <div className="container-sections-forms">
          <div className="grid-form-2-container gap-25">
            <Controller
              control={control}
              name={"year"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    typeInput={"text"}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                    label={
                      <>
                        Año <span>*</span>
                      </>
                    }
                  />
                );
              }}
            />
            <SelectComponent
              idInput={"codEmployment"}
              control={control}
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
              disabled={!year}
            />
          </div>
        </div>
        {/* <DevTool control={control} /> */}
      </FormComponent>
    </>
  );
};
