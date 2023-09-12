import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  FormComponent,
  ButtonComponent,
  SelectComponent,
  InputComponent,
} from "../../../common/components/Form";

import {
  Control,
  FieldValues,
  FormState,
  UseFormRegister,
  Controller,
} from "react-hook-form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { IDeductionsFilter } from "../../../common/interfaces/payroll.interfaces";

interface IPropsFilterDeductions {
  control: Control<IDeductionsFilter, any>;
  formState: FormState<FieldValues>;
  typeDeductionList: any[],
  redirectCreate: () => void;
  clearFields: () => void;
  onSubmit: () => Promise<void>;
  chargesState: IDropdownProps[];
  formValues: IDeductionsFilter;
}

export const FilterDeductionsForm = ({
  control,
  formState,
  typeDeductionList,
  redirectCreate,
  clearFields,
  onSubmit,
  chargesState,
  formValues,
}: IPropsFilterDeductions): React.JSX.Element => {
  const { errors, isValid } = formState;

  const { codCharge } = formValues;

  return (
    <>
      <FormComponent className="form-signIn" action={onSubmit}>
        <div className="container-sections-forms">
          <div className="grid-form-3-container gap-25">
            <SelectComponent
              idInput={"codEmployment"}
              control={control}
              errors={errors}
              //data={activeWorkerList}
              label={
                <>
                  Documento - Nombre del empleado. <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              filter={true}
              placeholder="Seleccione."
            />
            <SelectComponent
              idInput={"codFormsPeriod"}
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
              filter={true}
              placeholder="Seleccione."
            />
            <SelectComponent
              idInput={"typeDeduction"}
              control={control}
              errors={errors}
              data={typeDeductionList}
              label={
                <>
                  periodo de planilla <span>*</span>
                </>
              }
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
              disabled={!isValid}
            />
          </div>
        </div>      
      </FormComponent>
    </>
  );
};
