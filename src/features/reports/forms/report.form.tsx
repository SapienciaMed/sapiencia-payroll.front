import React, { BaseSyntheticEvent } from "react";
import { Control, FormState } from "react-hook-form";
import {
  ButtonComponent,
  FormComponent,
  LabelComponent,
  SelectComponent,
} from "../../../common/components/Form";

import { InputComponent } from "../../../common/components/Form/input-refactor.component";
import { EDirection } from "../../../common/constants/input.enum";
import { ETypeReport } from "../../../common/constants/report.enum";
import { InputRadioComponent } from "../../../common/components/Form/input-radio.component";

interface IPropsCreateUpdateDeductionsForm {
  control: Control<any, any>;
  formState: FormState<any>;
  activeWorkerList: any[];
  periodsListBiweeklyAuthorized: any[];
  typeReport: number;
  handleSubmitOtherIncome: (
    e?: BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
  clearFields: () => void;
  handleDisabledEmployment: () => boolean;
}

export const ReportForm = ({
  control,
  formState,
  activeWorkerList,
  periodsListBiweeklyAuthorized,
  typeReport,
  handleSubmitOtherIncome,
  handleDisabledEmployment,
  clearFields,
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
            {Number(typeReport) === ETypeReport.Colilla ? (
              <SelectComponent
                idInput={"period"}
                control={control}
                errors={errors}
                data={periodsListBiweeklyAuthorized}
                label={
                  <>
                    Periodo. <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                filter={true}
              />
            ) : (
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
            )}

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
              disabled={handleDisabledEmployment()}
            />
          </div>
          <div className="grid-form-3-container gap-25">
            <InputRadioComponent
              control={control}
              idInput="typeReport"
              value={ETypeReport.Colilla}
              direction={EDirection.row}
              label={"Colilla"}
              classNameLabel="text-black big bold"
            />
            <InputRadioComponent
              control={control}
              idInput="typeReport"
              value={ETypeReport.ResolucionVacaciones}
              direction={EDirection.row}
              label={"Resolución de vacaciones"}
              classNameLabel="text-black big bold"
            />
            <InputRadioComponent
              control={control}
              idInput="typeReport"
              value={ETypeReport.ResolucionLiquidacionDefinitiva}
              direction={EDirection.row}
              label={"Resolución de liquidación definitiva"}
              classNameLabel="text-black big bold"
            />
            <InputRadioComponent
              control={control}
              idInput="typeReport"
              value={ETypeReport.CertificadoLaboral}
              direction={EDirection.row}
              label={"Certificado laboral"}
              classNameLabel="text-black big bold"
            />
            <InputRadioComponent
              control={control}
              idInput="typeReport"
              value={ETypeReport.CertificadoIngresosRetenciones}
              direction={EDirection.row}
              label={"Certificado de ingresos y retenciones"}
              classNameLabel="text-black big bold"
            />
            <InputRadioComponent
              control={control}
              idInput="typeReport"
              value={ETypeReport.ConstanciaContratos}
              direction={EDirection.row}
              label={"Constancia de contratos"}
              classNameLabel="text-black big bold"
            />
          </div>
        </div>
      </div>
      <div className="button-save-container-display m-top-20">
        <ButtonComponent
          value={"Limpiar campos"}
          className="button-clean bold"
          type="button"
          action={clearFields}
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
