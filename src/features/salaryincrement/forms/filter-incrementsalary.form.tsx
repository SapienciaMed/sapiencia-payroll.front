import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  FormComponent,
  SelectComponent,
  InputComponent,
  ButtonComponent,
} from "../../../common/components/Form";

import {
  Control,
  FieldValues,
  FormState,
  UseFormRegister,
  Controller,
} from "react-hook-form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { ISalaryIncrementFilter } from "../../../common/interfaces/payroll.interfaces";

interface IPropsFilterIncremetSalary {
  register: UseFormRegister<any>;
  control: Control<ISalaryIncrementFilter, any>;
  formState: FormState<FieldValues>;
  redirectCreate: () => void;
  clearFields: () => void;
  onSubmit: () => Promise<void>;
  chargesState: IDropdownProps[];
}

export const FilterIncrementSalary = ({
  register,
  control,
  formState,
  redirectCreate,
  clearFields,
  onSubmit,
  chargesState,
}: IPropsFilterIncremetSalary): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <div className="container-sections-forms">
      <div className="title-area">
        <label className="text-black extra-large bold">Búsqueda de cargo</label>

        <div
          className="title-button text-main biggest pointer"
          onClick={redirectCreate}
        >
          Crear aumento <AiOutlinePlusCircle />
        </div>
      </div>

      <div>
        <FormComponent
          id="searchIncrementSalary"
          className="form-signIn"
          action={onSubmit}
        >
          <div className="grid-form-2-container gap-25">
            <SelectComponent
              idInput={"codCharge"}
              control={control}
              errors={errors}
              data={chargesState}
              label={<>Cargos</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />

            <Controller
              control={control}
              name={"numberActApproval"}
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
        </FormComponent>
      </div>
    </div>
  );
};
