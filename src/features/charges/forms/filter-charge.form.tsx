import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  FormComponent,
  SelectComponent,
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";
import { IChargeFilters } from "../../../common/interfaces/payroll.interfaces";

interface IPropsFilterChargeForm {
  control: Control<IChargeFilters, any>;
  formState: FormState<FieldValues>;
  formValues: IChargeFilters;
  typesChargesList: any[];
  redirectCreate: () => void;
  clearFields: () => void;
  onSubmit: () => Promise<void>;
  register: UseFormRegister<IChargeFilters>;
}

export const FilterChargeForm = ({
  control,
  formState,
  formValues,
  typesChargesList,
  redirectCreate,
  clearFields,
  onSubmit,
  register,
}: IPropsFilterChargeForm): React.JSX.Element => {
  const { errors } = formState;

  const { codChargeType, name } = formValues;

  return (
    <div className="container-sections-forms">
      <div className="title-area">
        <label className="text-black extra-large bold">Consultar cargos</label>

        <div
          className="title-button text-main biggest pointer"
          onClick={redirectCreate}
        >
          Crear cargo <AiOutlinePlusCircle />
        </div>
      </div>

      <div>
        <FormComponent
          id="searchSpreadSheet"
          className="form-signIn"
          action={onSubmit}
        >
          <div className="grid-form-2-container gap-25">
            <SelectComponent
              idInput={"codChargeType"}
              control={control}
              errors={errors}
              data={typesChargesList}
              label={<>Tipo de cargo</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />
            <Controller
              control={control}
              name={"name"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    label={<>Cargo/Perfil</>}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                    typeInput={""}
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
              disabled={!codChargeType && !name}
            />
          </div>
        </FormComponent>
      </div>
    </div>
  );
};
