import React, { useEffect, useRef, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent
} from "../../../common/components/Form";
import {  useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
import {
  IEditVacation,
  IVacation,
  IWorkersVacation,
} from "../../../common/interfaces/payroll.interfaces";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { calculateBusinessDays } from "../../../common/utils/helpers";
import useVacationService from "../../../common/hooks/vacation-service.hook";
const EditVacationPage = () => {
  const [totalDays, setTotalDays] = useState<string>("0");
  const [vacation, setVacation] = useState<IVacation>(null);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchRecord);
  const { updateVacation } = useVacationService();
  const {id} =useParams()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  } = useForm<IEditVacation>();
  const [incapacityRefund, generalRefund] = watch([
    "incapacityRefund",
    "generalRefund",
  ]);
  const [startVacation, endVacation] = watch(["dateFrom", "dateUntil"]);

  useEffect(() => {
    console.log(startVacation)
    const days = calculateBusinessDays(startVacation, endVacation);
    setTotalDays(`${days ? days : 0}`);
   
  }, [startVacation, endVacation]);
 console.log(id)
  const onEdit = handleSubmit(async (data: IEditVacation) => {
    const dataEdit ={
      id : Number(id),
      dateFrom : data?.dateFrom,
      dateUntil: data?.dateUntil,
      observation: data?.observation
    }
    await updateVacation(dataEdit);
  });
  return (
    <>
      <div className="container-sections-forms m-24px">
        <h2>Editar vacaciones</h2>
        <FormComponent
          id="editVacationForm"
          className="form-signIn"
          action={onEdit}
        >
          <div className=" grid-form-3-container gap-25 container-sections-forms  m-24px">
            <div className="grid-span-3-columns">
              <input
                {...register("generalRefund")}
                type="checkbox"
                className="checkbox-basic"
              />{" "}
              <span className="text-black large bold">Reintegro general</span>
              <input
                {...register("incapacityRefund")}
                type="checkbox"
                className="checkbox-basic"
              />{" "}
              <span className="text-black large bold">
                Reintegro por incapacidad
              </span>
            </div>
            <DatePickerComponent
              idInput={"dateFrom"}
              control={control}
              label={"Desde"}
              errors={errors}
              classNameLabel="text-black big break-line bold"
              className="dataPicker-basic  medium "
              disabled={!generalRefund && !incapacityRefund}
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
              disabled={!generalRefund && !incapacityRefund}
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
            />
            
            <InputComponent
              idInput={"totalDays"}
              className="input-basic medium"
              typeInput="text"
              classNameLabel="text-black big bold"
              label="Total días"
              register={register}
              disabled={true}
              errors={errors}
              value={totalDays}
            />
            {incapacityRefund && (
              <InputComponent
                idInput={"pendingTotalDays"}
                className="input-basic medium"
                typeInput="text"
                classNameLabel="text-black big bold"
                label="Total Días pendientes"
                register={register}
                disabled={true}
                errors={errors}
                value={totalDays}
              />
            )}
            <div className="grid-span-3-columns">
              <TextAreaComponent
                idInput={"observation"}
                className="text-area-basic"
                classNameLabel="text-black big bold"
                label="Observaciones"
                register={register}
                disabled={!generalRefund && !incapacityRefund}
                errors={errors}
                rows={5}
              />
            </div>
            <div className="button-save-container-display grid-span-3-columns  ">
              <ButtonComponent
                value={"Cancelar"}
                type="button"
                className="button-clean bold"
                action={() => {
                  navigate("/");
                }}
              />
              <ButtonComponent
                value={"Guardar"}
                disabled={!incapacityRefund && !generalRefund}
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
