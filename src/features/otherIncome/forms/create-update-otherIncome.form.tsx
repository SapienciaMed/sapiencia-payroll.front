import React, { BaseSyntheticEvent } from "react";
import { Control, FormState } from "react-hook-form";
import {
  ButtonComponent,
  FormComponent,
  InputNumberComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { IDropdownProps } from "../../../common/interfaces/select.interface";

interface IPropsCreateUpdateDeductionsForm {
  action: string;
  control: Control<any, any>;
  formState: FormState<any>;
  activeWorkerList: any[];
  periodsList: any[];
  typeIncomeByTypeList: IDropdownProps[];
  statesOtherIncomeList: IDropdownProps[];
  validateStateField: () => boolean;
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
  statesOtherIncomeList,
  validateStateField,
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
                disabled={action === "edit" ? true : false}
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
                disabled={action === "edit" ? true : false}
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
                disabled={action === "edit" ? true : false}
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

              <SelectComponent
                idInput={"state"}
                control={control}
                errors={errors}
                data={statesOtherIncomeList}
                label={
                  <>
                    Estado <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                disabled={validateStateField()}
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
