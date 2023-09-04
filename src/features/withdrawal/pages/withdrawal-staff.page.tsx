import { Controller } from "react-hook-form";
import {
  ButtonComponent,
  DatePickerComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
  TextAreaComponent,
} from "../../../common/components/Form";
import useRetirementEmployment from "../hooks/retirement-employment.hook";

import useSearchStaff from "../hooks/search-staff.hook";

export const WithDrawalStaffPage = () => {
  const {
    onSubmitStaff,
    controlStaff,
    errorsStaff,
    isValidStaff,
    activeWorkerList,
    dataEmployment,
    reasonsForWithdrawal,
    clearDataEmployment,
  } = useSearchStaff();

  const {
    onSubmitRetirement,
    registerRetirement,
    controlRetirement,
    errorRetirementEmployment,
    isValidRetirement,
  } = useRetirementEmployment(dataEmployment, clearDataEmployment);

  return (
    <>
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black extra-large bold">
              Retiro personal
            </label>
          </div>
          <div>
            {dataEmployment.length > 0 ? (
              <FormComponent
                id="retirementEmployment"
                className="form-signIn"
                action={onSubmitRetirement}
              >
                <div className="grid gap-25">
                  <div className="grid-form-3-container gap-25">
                    <InputComponent
                      idInput={""}
                      label={<>Nombres</>}
                      value={`${dataEmployment[0].worker?.firstName} ${dataEmployment[0].worker?.secondName}`}
                      typeInput={"text"}
                      disabled={true}
                      className="input-basic medium"
                      classNameLabel="text-black big bold"
                    />

                    <InputComponent
                      idInput={""}
                      label={<>Apellidos</>}
                      typeInput={"text"}
                      errors={""}
                      value={`${dataEmployment[0].worker?.surname} ${dataEmployment[0].worker?.secondSurname}`}
                      disabled={true}
                      className="input-basic medium"
                      classNameLabel="text-black big bold"
                    />
                    <InputComponent
                      idInput={""}
                      label={<>Tipo de contrato</>}
                      typeInput={"text"}
                      errors={""}
                      value={`${dataEmployment[0]?.typesContracts?.[0].name}`}
                      disabled={true}
                      className="input-basic medium"
                      classNameLabel="text-black big bold"
                    />
                  </div>
                  <div className="grid-form-3-container gap-25">
                    <DatePickerComponent
                      idInput={"retirementDate"}
                      control={controlRetirement}
                      label={
                        <>
                          Fecha retiro <span>*</span>
                        </>
                      }
                      errors={errorRetirementEmployment}
                      classNameLabel="text-black big bold"
                      className="dataPicker-basic  medium "
                      placeholder="DD/MM/YYYY"
                      dateFormat="dd/mm/yy"
                      minDate={new Date(dataEmployment[0].startDate)}
                      maxDate={new Date()}
                    />

                    <SelectComponent
                      idInput={"idReasonRetirement"}
                      control={controlRetirement}
                      errors={errorRetirementEmployment}
                      data={reasonsForWithdrawal}
                      label={
                        <>
                          Motivo <span>*</span>
                        </>
                      }
                      className="select-basic medium"
                      classNameLabel="text-black big bold"
                      placeholder="Seleccione"
                      filter={false}
                    />
                    <InputComponent
                      idInput={""}
                      label={<>Nro contrato</>}
                      typeInput={"text"}
                      errors={""}
                      value={`${dataEmployment[0]?.contractNumber}`}
                      disabled={true}
                      className="input-basic medium"
                      classNameLabel="text-black big bold"
                    />
                  </div>
                  <div className="grid-span-3-columns">
                    <Controller
                      control={controlRetirement}
                      name={"observation"}
                      render={({ field }) => {
                        return (
                          <TextAreaComponent
                            label={
                              <>
                                Observaciones <span>*</span>
                              </>
                            }
                            value={field.value}
                            idInput={field.name}
                            className="text-area-basic"
                            classNameLabel="text-black big bold"
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            errors={errorRetirementEmployment}
                            rows={5}
                          />
                        );
                      }}
                    />
                    <div className="text-right">
                      <span className="text-span ">Max. {1000} carácteres</span>
                    </div>
                  </div>
                </div>
                <div className="button-save-container-display">
                  <ButtonComponent
                    value={"Cancelar"}
                    type="button"
                    action={() => clearDataEmployment()}
                    className="button-clean bold"
                  />
                  <ButtonComponent
                    value={"Retirar empleado"}
                    className="button-save extra_large  disabled-black"
                    disabled={!isValidRetirement}
                  />
                </div>
              </FormComponent>
            ) : (
              <>
                <FormComponent
                  id="searchRecordForm"
                  className="form-signIn"
                  action={onSubmitStaff}
                >
                  <div className="grid-form-3-container gap-25">
                    <SelectComponent
                      idInput={"workerId"}
                      control={controlStaff}
                      errors={errorsStaff}
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
                  <div className="button-save-container-display">
                    <ButtonComponent
                      value={"Buscar"}
                      className="button-save big  disabled-black"
                      disabled={!isValidStaff}
                    />
                  </div>
                </FormComponent>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
