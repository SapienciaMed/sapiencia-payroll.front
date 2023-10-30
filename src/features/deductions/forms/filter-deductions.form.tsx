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

import useListData from "../../vacation/hooks/list.hook";

interface IPropsFilterDeductions {
  control: Control<IDeductionsFilter, any>;
  formState: FormState<FieldValues>;
  typeDeductionList: any[];
  lastPeriodsList: any[];
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
  lastPeriodsList,
  redirectCreate,
  clearFields,
  onSubmit,
  chargesState,
  formValues,
}: IPropsFilterDeductions): React.JSX.Element => {
  const { errors, isValid } = formState;

  const { codEmployment, typeDeduction, codFormsPeriod } = formValues;

  const { activeWorkerList } = useListData(false);

  return (
    <>
      <FormComponent className="form-signIn" action={onSubmit}>
        <div className="container-sections-forms">
          <div className="grid-form-3-container gap-25">
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
            <SelectComponent
              idInput={"typeDeduction"}
              control={control}
              errors={errors}
              data={typeDeductionList}
              label={<>Tipo de deducción</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              filter={true}
              placeholder="Seleccione."
            />
            <SelectComponent
              idInput={"codFormsPeriod"}
              control={control}
              errors={errors}
              data={lastPeriodsList}
              label={<>Periodo de planilla</>}
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
              disabled={!codEmployment && !codFormsPeriod && !typeDeduction}
            />
          </div>
        </div>
      </FormComponent>
    </>
  );
};
