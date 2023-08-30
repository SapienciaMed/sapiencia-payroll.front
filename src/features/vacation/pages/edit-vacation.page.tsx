import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../common/components/Form";
import { Controller } from "react-hook-form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import useEditVacationData from "../hooks/edit-vacation.hook";
const EditVacationPage = () => {
  const {
    handleModalEdit,
    register,
    control,
    errors,
    refund,
    vacation,
    handleCancelModal,
  } = useEditVacationData();
  return (
    <>
      <div className="container-sections-forms m-24px">
        <h2>Editar vacaciones</h2>
        <FormComponent
          id="editVacationForm"
          className="form-signIn"
          action={handleModalEdit}
        >
          <div className=" grid-form-3-container gap-25 container-sections-forms  m-24px">
            <div className="grid-span-3-columns container-text">
              <div>
                <input
                  {...register("refund")}
                  type="radio"
                  id="refund"
                  value="general"
                  className="checkbox-basic"
                />{" "}
                <span className="text-black large bold">Reintegro general</span>
              </div>
              <div>
                <input
                  {...register("refund")}
                  type="radio"
                  id="refund"
                  value="Incapacaidad"
                  className="checkbox-basic"
                />{" "}
                <span className="text-black large bold">
                  Reintegro por incapacidad
                </span>
              </div>
            </div>
            <DatePickerComponent
              idInput={"dateFrom"}
              control={control}
              label={"Desde"}
              errors={errors}
              classNameLabel="text-black big break-line bold"
              className="dataPicker-basic  medium "
              disabled={true}
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
            />
            <DatePickerComponent
              idInput={"dateUntil"}
              control={control}
              label={"Hasta"}
              errors={errors}
              classNameLabel="text-black big break-line bold"
              className="dataPicker-basic  medium "
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
              disabled={!refund}
              maxDate={
                new Date(
                  vacation?.vacationDay
                    .filter((day) => !day.paid)
                    .sort((a, b) => b.id - a.id)[0]?.dateUntil
                )
              }
            />

            <Controller
              control={control}
              name={"totalDays"}
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
            <Controller
              control={control}
              name={"pendingTotalDays"}
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
                    label="Total Días pendientes"
                    register={register}
                    disabled={true}
                  />
                );
              }}
            />

            <div className="grid-span-3-columns">
              <TextAreaComponent
                idInput={"observation"}
                className="text-area-basic"
                classNameLabel="text-black big bold"
                label="Observaciones"
                register={register}
                disabled={!refund}
                errors={errors}
                rows={5}
              />
            </div>
            <div className="button-save-container-display grid-span-3-columns  ">
              <ButtonComponent
                value={"Cancelar"}
                type="button"
                className="button-clean bold"
                action={handleCancelModal}
              />
              <ButtonComponent
                value={"Guardar"}
                disabled={!refund}
                type="submit"
                form="editVacationForm"
                className="button-save big disabled-black"
              />
            </div>
          </div>
        </FormComponent>
      </div>
    </>
  );
};

export default EditVacationPage;
