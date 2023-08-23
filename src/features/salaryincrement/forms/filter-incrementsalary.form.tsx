import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  FormComponent,
  SelectComponent,
  InputComponent,
} from "../../../common/components/Form";

import { Control, FieldErrors, FieldValues } from "react-hook-form";

interface IPropsFilterIncremetSalary {
  redirectCreate: () => void;
  onSubmit: () => Promise<void>;
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
}

export const FilterIncrementSalary = ({
  redirectCreate,
  control,
  errors,
  onSubmit,
}: IPropsFilterIncremetSalary): React.JSX.Element => {
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
              idInput={"codEmployment"}
              control={control}
              errors={errors}
              data={[]}
              label={<>Cargos</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />

            <InputComponent
              idInput={""}
              errors={errors}
              typeInput={"text"}
              label={
                <>
                  Número de acta de aprobación <span>*</span>
                </>
              }
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
          </div>
        </FormComponent>
      </div>
    </div>
  );
};
