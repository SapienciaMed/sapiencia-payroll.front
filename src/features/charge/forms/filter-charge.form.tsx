import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  FormComponent,
  ButtonComponent,
  SelectComponent,
  // InputComponent,
} from "../../../common/components/Form";

import {
  Control,
  FieldValues,
  FormState,
  UseFormRegister,
  Controller,
} from "react-hook-form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import {
  IChargeFilters,
  IDeductionsFilter,
} from "../../../common/interfaces/payroll.interfaces";

import useListData from "../../vacation/hooks/list.hook";
import { InputComponent } from "../../../common/components/Form/input-refactor.component";

interface IPropsFilterCharge {
  control: Control<IChargeFilters, any>;
  formState: FormState<FieldValues>;
  clearFields: () => void;
  onSubmit: () => Promise<void>;
  formValues: IChargeFilters;
}

export const FilterChargeForm = ({
  control,
  formState,
  clearFields,
  onSubmit,
  formValues,
}: IPropsFilterCharge): React.JSX.Element => {
  const { id } = formValues;

  // const { activeWorkerList } = useListData(false);

  return (
    <FormComponent className="form-signIn" action={onSubmit}>
      <div className="container-sections-forms">
        <div className="grid-form-3-container gap-25">
          <SelectComponent
            idInput={"typeCharge"}
            control={control}
            data={[]}
            label={<>Tipo de cargo.</>}
            className="select-basic medium"
            classNameLabel="text-black big bold"
            filter={true}
            placeholder="Seleccione."
          />

          <InputComponent
            control={control}
            idInput={"charge"}
            typeInput="text"
            className="input-basic medium"
            label={<>Cargo/Perfil.</>}
            classNameLabel="text-black big bold"
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
            // disabled={!codEmployment && !codFormsPeriod && !typeDeduction}
          />
        </div>
      </div>
    </FormComponent>
  );
};
