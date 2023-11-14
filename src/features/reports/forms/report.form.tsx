import React, { BaseSyntheticEvent } from "react";
import { Control, FormState } from "react-hook-form";
import {
  ButtonComponent,
  FormComponent,
  LabelComponent,
  SelectComponent,
} from "../../../common/components/Form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { InputComponent } from "../../../common/components/Form/input-refactor.component";
import { EDirection } from "../../../common/constants/input.enum";

interface IPropsCreateUpdateDeductionsForm {
  control: Control<any, any>;
  formState: FormState<any>;
  activeWorkerList: any[];
  handleSubmitOtherIncome: (
    e?: BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
}

export const ReportForm = ({
  control,
  formState,
  activeWorkerList,
  handleSubmitOtherIncome,
}: IPropsCreateUpdateDeductionsForm): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <FormComponent className="form-signIn" action={handleSubmitOtherIncome}>
      <div className="container-sections-forms">
        <div className="grid gap-25">
          <div className="grid-form-2-container gap-25">
            {/* <SelectComponent
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
            /> */}

            <InputComponent
              control={control}
              idInput={`period`}
              typeInput="text"
              className="input-basic medium"
              classNameLabel="text-black big break-line bold"
              label={
                <>
                  Periodo <span>*</span>
                </>
              }
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
            />
          </div>
          <div className="grid-form-3-container gap-25">
            <div className="check-label">
              <InputComponent
                control={control}
                idInput={`period`}
                direction={EDirection.row}
                typeInput="radio"
                className="checkbox-basic"
                classNameLabel="text-black big break-line bold"
              >
                <LabelComponent
                  value="Colilla"
                  className="text-black big bold"
                  htmlFor="state"
                />
              </InputComponent>
            </div>
            <div className="check-label">
              <InputComponent
                control={control}
                idInput={`period`}
                direction={EDirection.row}
                typeInput="radio"
                className="checkbox-basic"
                classNameLabel="text-black big break-line bold"
              >
                <LabelComponent
                  value="Resolución de vacaciones"
                  className="text-black big bold"
                  htmlFor="state"
                />
              </InputComponent>
            </div>
            <div className="check-label">
              <InputComponent
                control={control}
                idInput={`period`}
                direction={EDirection.row}
                typeInput="radio"
                className="checkbox-basic"
                classNameLabel="text-black big break-line bold"
              >
                <LabelComponent
                  value="Resolución de liquidación definitiva"
                  className="text-black big bold"
                  htmlFor="state"
                />
              </InputComponent>
            </div>
            <div className="check-label">
              <InputComponent
                control={control}
                idInput={`period`}
                direction={EDirection.row}
                typeInput="radio"
                className="checkbox-basic"
                classNameLabel="text-black big break-line bold"
              >
                <LabelComponent
                  value="Certificado laboral"
                  className="text-black big bold"
                  htmlFor="state"
                />
              </InputComponent>
            </div>{" "}
            <div className="check-label">
              <InputComponent
                control={control}
                idInput={`period`}
                direction={EDirection.row}
                typeInput="radio"
                className="checkbox-basic"
                classNameLabel="text-black big break-line bold"
              >
                <LabelComponent
                  value="Certificado de ingresos y retenciones"
                  className="text-black big bold"
                  htmlFor="state"
                />
              </InputComponent>
            </div>
            <div className="check-label">
              <InputComponent
                control={control}
                idInput={`period`}
                direction={EDirection.row}
                typeInput="radio"
                className="checkbox-basic"
                classNameLabel="text-black big break-line bold"
              >
                <LabelComponent
                  value="Constancia de contratos"
                  className="text-black big bold"
                  htmlFor="state"
                />
              </InputComponent>
            </div>
          </div>
        </div>
      </div>
      <div className="button-save-container-display m-top-20">
        <ButtonComponent
          value={"Cancelar"}
          className="button-clean bold"
          type="button"
          // action={redirectCancel}
        />
        <ButtonComponent
          value={`Generar`}
          className="button-save large disabled-black"
          disabled={!isValid}
        />
      </div>
    </FormComponent>
  );
};
