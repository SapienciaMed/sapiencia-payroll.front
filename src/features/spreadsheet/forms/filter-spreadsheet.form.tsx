import React from "react";
import { Control, FieldValues, FormState } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  FormComponent,
  SelectComponent,
  ButtonComponent,
  DatePickerComponent,
} from "../../../common/components/Form";
import { IFormPeriodFilters } from "../../../common/interfaces/payroll.interfaces";

interface IPropsFilterSpreadSheetForm {
  control: Control<IFormPeriodFilters, any>;
  formState: FormState<FieldValues>;
  formValues: IFormPeriodFilters;
  typesSpreadSheetList: any[];
  stateSpreadSheetList: any[];
  redirectCreate: () => void;
  clearFields: () => void;
  onSubmit: () => Promise<void>;
}

export const FilterSpreadSheetForm = ({
  control,
  formState,
  formValues,
  typesSpreadSheetList,
  stateSpreadSheetList,
  redirectCreate,
  clearFields,
  onSubmit,
}: IPropsFilterSpreadSheetForm): React.JSX.Element => {
  const { errors } = formState;

  const { idFormType, paidDate, state } = formValues;

  return (
    <div className="container-sections-forms">
      <div className="title-area">
        <label className="text-black extra-large bold">
          Consultar planillas
        </label>

        <div
          className="title-button text-main biggest pointer"
          onClick={redirectCreate}
        >
          Crear planilla <AiOutlinePlusCircle />
        </div>
      </div>

      <div>
        <FormComponent
          id="searchSpreadSheet"
          className="form-signIn"
          action={onSubmit}
        >
          <div className="grid-form-3-container gap-25">
            <SelectComponent
              idInput={"idFormType"}
              control={control}
              errors={errors}
              data={typesSpreadSheetList}
              label={<>Tipo de planilla</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />
            <SelectComponent
              idInput={"state"}
              control={control}
              errors={errors}
              data={stateSpreadSheetList}
              label={<>Estado</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />

            <DatePickerComponent
              idInput={"paidDate"}
              control={control}
              label={<>Fecha pago</>}
              errors={errors}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
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
              disabled={!idFormType && !paidDate && !state}
            />
          </div>
        </FormComponent>
      </div>
    </div>
  );
};
