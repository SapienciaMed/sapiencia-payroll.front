import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { Controller, useForm } from "react-hook-form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { addBusinessDays } from "../../../common/utils/helpers";
import { ResponsiveTable } from "../../../common/components/Form/table-detail.component";
import useCreateVacationData from "../hooks/create-vacation.hook";

const createVacationPage = () => {
  const {
    onSubmit,
    control,
    errors,
    activeWorkerList,
    listPeriods,
    vacationData,
    onCreate,
    register,
    vacation,
    checkEnjoyedDays,
    startVacation,
    checkCompensatoryDays,
    pendingDays,
    handleModal,
  } = useCreateVacationData();
  return (
    <>
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black biggest bold">
              Crear periodo de vacaciones
            </label>
          </div>
          <div className="container-sections-forms ">
            <div>
              <FormComponent
                id="searchWorkerForm"
                className="form-signIn"
                action={onSubmit}
              >
                <div className="grid-form-2-container gap-25">
                  <SelectComponent
                    idInput={"idWorker"}
                    control={control}
                    errors={errors}
                    data={activeWorkerList}
                    label={"Empleado"}
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccione"
                    filter={true}
                  />

                  <SelectComponent
                    idInput={"period"}
                    control={control}
                    errors={errors}
                    data={listPeriods}
                    label={"Periodo"}
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccione"
                  />
                </div>
                <div className="button-save-container-display">
                  <ButtonComponent
                    value={"Buscar"}
                    className="button-save big disabled-black"
                  />
                </div>
              </FormComponent>
            </div>

            <div className="container-table-result-responsive">
              <ResponsiveTable data={vacationData} />
            </div>
          </div>
          <FormComponent
            id="createVacationForm"
            className="form-signIn"
            action={onCreate}
          >
            <div className=" grid-form-3-container gap-25 container-sections-forms">
              <div className="grid-span-3-columns">
                <input
                  {...register("checkEnjoyedDays")}
                  type="checkbox"
                  className="checkbox-basic"
                  disabled={!vacation?.available}
                />{" "}
                <span className="text-black large bold">Dias disfrutados</span>
              </div>
              <DatePickerComponent
                idInput={"startDate"}
                control={control}
                label={"Desde"}
                errors={errors}
                classNameLabel="text-black big break-line bold"
                className="dataPicker-basic  medium "
                disabled={!checkEnjoyedDays}
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                disabledDays={[0, 6]}
              />
              <DatePickerComponent
                idInput={"endDate"}
                control={control}
                label={"Hasta"}
                errors={errors}
                classNameLabel="text-black big break-line bold"
                className="dataPicker-basic  medium "
                disabled={!startVacation}
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                disabledDays={[0, 6]}
                minDate={new Date(startVacation)}
                maxDate={addBusinessDays(
                  startVacation || new Date(),
                  Number(vacation?.available || 0) +
                    Number(vacation?.periodFormer || 0) +
                    (vacation?.refund || 0)
                )}
              />
              <Controller
                control={control}
                name={"totalDaysEnjoyed"}
                defaultValue={0}
                render={({ field }) => {
                  return (
                    <InputComponent
                      id={field.name}
                      idInput={field.name}
                      value={`${field.value}`}
                      className="input-basic medium"
                      typeInput="text"
                      classNameLabel="text-black big bold"
                      label="Total días"
                      register={register}
                      disabled={true}
                    />
                  );
                }}
              />
            </div>

            <div className="grid-form-3-container gap-25 container-sections-forms">
              <div className="grid-span-3-columns">
                <input
                  {...register("checkCompensatoryDays")}
                  type="checkbox"
                  className="checkbox-basic"
                  disabled={!vacation?.available}
                />
                <span className="text-black large bold">Dias compensados</span>
              </div>
              <DatePickerComponent
                idInput={"startDateCompensatedDays"}
                control={control}
                label={"Días compensatorios"}
                errors={errors}
                classNameLabel="text-black big break-line bold"
                className="dataPicker-basic  medium "
                disabled={!checkCompensatoryDays}
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                disabledDays={[0, 6]}
              />

              <Controller
                control={control}
                name={"totalCompensatoryDays"}
                defaultValue={0}
                render={({ field }) => {
                  return (
                    <InputComponent
                      id={field.name}
                      idInput={field.name}
                      value={`${field.value}`}
                      className="input-basic medium"
                      typeInput="number"
                      classNameLabel="text-black big bold"
                      label="Total días compensatorios"
                      register={register}
                      onChange={field.onChange}
                      disabled={!checkCompensatoryDays}
                      errors={errors}
                    />
                  );
                }}
              />
              <InputComponent
                idInput={"pendingDays"}
                className="input-basic medium"
                typeInput="text"
                classNameLabel="text-black big bold"
                label="Días pendientes"
                disabled={true}
                errors={errors}
                value={`${pendingDays}`}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={"observation"}
                defaultValue={""}
                render={({ field }) => {
                  return (
                    <TextAreaComponent
                      idInput={field.name}
                      className="text-area-basic"
                      classNameLabel="text-black big bold"
                      label="Observaciones"
                      register={register}
                      value={`${field.value}`}
                      onChange={field.onChange}
                      disabled={!checkCompensatoryDays && !checkEnjoyedDays}
                      errors={errors}
                      rows={5}
                    />
                  );
                }}
              />
            </div>
          </FormComponent>
        </div>
        <div className="button-save-container-display mr-24px ">
          <ButtonComponent
            value={"Cancelar"}
            type="button"
            className="button-clean bold"
            action={handleModal}
          />
          <ButtonComponent
            value={"Guardar"}
            disabled={!checkCompensatoryDays && !checkEnjoyedDays}
            type="submit"
            form="createVacationForm"
            className="button-save big disabled-black"
          />
        </div>
      </div>
    </>
  );
};

export default createVacationPage;
