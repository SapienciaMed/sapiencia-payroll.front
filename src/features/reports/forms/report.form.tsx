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
  inactiveWorkerList: any[];
  activeContractorsList: any[];
  vacationPeriods: any[];
  periodsListBiweeklyAuthorized: any[];
  periodsListVacationAuthorized: any[];
  typeReport: number;
  workerList: any[];
  handleSubmitOtherIncome: (
    e?: BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
  clearFields: () => void;
  handleDisabledPeriod: () => boolean;
  handleDisabledEmployment: () => boolean;
  validateActionAccess: (indicator: string) => boolean;
}

export const ReportForm = ({
  control,
  formState,
  activeWorkerList,
  activeContractorsList,
  inactiveWorkerList,
  workerList,
  periodsListBiweeklyAuthorized,
  periodsListVacationAuthorized,
  vacationPeriods,
  typeReport,
  handleSubmitOtherIncome,
  handleDisabledPeriod,
  handleDisabledEmployment,
  clearFields,
  validateActionAccess,
}: IPropsCreateUpdateDeductionsForm): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <FormComponent className="form-signIn" action={handleSubmitOtherIncome}>
      <div className="container-sections-forms">
        <div className="grid gap-25">
          <div className="grid-form-2-container gap-25">
            {Number(typeReport) === ETypeReport.Colilla ? (
              <SelectComponent
                idInput={"period"}
                control={control}
                errors={errors}
                data={
                  Number(typeReport) === ETypeReport.Colilla
                    ? periodsListBiweeklyAuthorized
                    : periodsListVacationAuthorized
                }
                label={
                  <>
                    Periodo. <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                filter={true}
                disabled={handleDisabledPeriod()}
              />
            ) : Number(typeReport) === ETypeReport.ResolucionVacaciones ? (
              <SelectComponent
                idInput={"period"}
                control={control}
                errors={errors}
                data={periodsListVacationAuthorized}
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
                disabled={handleDisabledPeriod()}
              />
            )}
            {Number(typeReport) === ETypeReport.ConstanciaContratos ? (
              <SelectComponent
                idInput={"codEmployment"}
                control={control}
                errors={errors}
                data={activeContractorsList}
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
            ) : Number(typeReport) ===
              ETypeReport.ResolucionLiquidacionDefinitiva ? (
              <SelectComponent
                idInput={"codEmployment"}
                control={control}
                errors={errors}
                data={inactiveWorkerList}
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
            ) : Number(typeReport) === ETypeReport.Colilla ? (
              <SelectComponent
                idInput={"codEmployment"}
                control={control}
                errors={errors}
                data={workerList}
                label={
                  <>
                    Documento - Nombre del empleado. <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                disabled={handleDisabledEmployment()}
                filter={true}
              />
            ) : Number(typeReport) === ETypeReport.ResolucionVacaciones ? (
              <SelectComponent
                idInput={"codEmployment"}
                control={control}
                errors={errors}
                data={workerList}
                label={
                  <>
                    Documento - Nombre del empleado. <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                disabled={handleDisabledEmployment()}
                filter={true}
              />
            ) : (
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
            )}
          </div>
          <div className="grid-form-3-container gap-25">
            {validateActionAccess("GENERAR_COLILLA_NOMINA") && (
              <InputRadioComponent
                control={control}
                idInput="typeReport"
                value={ETypeReport.Colilla}
                direction={EDirection.row}
                label={"Colilla"}
                classNameLabel="text-black big bold"
                disabled={!validateActionAccess("GENERAR_COLILLA_NOMINA")}
              />
            )}

            {validateActionAccess("GENERAR_RESOLUCION_VACACIONES_NOMINA") && (
              <InputRadioComponent
                control={control}
                idInput="typeReport"
                value={ETypeReport.ResolucionVacaciones}
                direction={EDirection.row}
                label={"Resolución de vacaciones"}
                classNameLabel="text-black big bold"
                disabled={
                  !validateActionAccess("GENERAR_RESOLUCION_VACACIONES_NOMINA")
                }
              />
            )}
            {validateActionAccess("GENERAR_RESOLUCION_LIQUIDACION_NOMINA") && (
              <InputRadioComponent
                control={control}
                idInput="typeReport"
                value={ETypeReport.ResolucionLiquidacionDefinitiva}
                direction={EDirection.row}
                label={"Resolución de liquidación definitiva"}
                classNameLabel="text-black big bold"
                disabled={
                  !validateActionAccess("GENERAR_RESOLUCION_LIQUIDACION_NOMINA")
                }
              />
            )}
            {validateActionAccess("GENERAR_CERTIFICADO_LABORAL_NOMINA") && (
              <InputRadioComponent
                control={control}
                idInput="typeReport"
                value={ETypeReport.CertificadoLaboral}
                direction={EDirection.row}
                label={"Certificado laboral"}
                classNameLabel="text-black big bold"
                disabled={
                  !validateActionAccess("GENERAR_CERTIFICADO_LABORAL_NOMINA")
                }
              />
            )}
            {validateActionAccess("GENERAR_CERTIFICADO_RETENCIONES_NOMINA") && (
              <InputRadioComponent
                control={control}
                idInput="typeReport"
                value={ETypeReport.CertificadoIngresosRetenciones}
                direction={EDirection.row}
                label={"Certificado de ingresos y retenciones"}
                classNameLabel="text-black big bold"
                disabled={
                  !validateActionAccess(
                    "GENERAR_CERTIFICADO_RETENCIONES_NOMINA"
                  )
                }
              />
            )}
            {validateActionAccess("GENERAR_CONSTANCIA_CONTRATOS_NOMINA") && (
              <InputRadioComponent
                control={control}
                idInput="typeReport"
                value={ETypeReport.ConstanciaContratos}
                direction={EDirection.row}
                label={"Constancia de contratos"}
                classNameLabel="text-black big bold"
                disabled={
                  !validateActionAccess("GENERAR_CONSTANCIA_CONTRATOS_NOMINA")
                }
              />
            )}
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
