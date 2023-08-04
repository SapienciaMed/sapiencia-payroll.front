import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../common/components/Form";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
import {
  IEditVacation,
  IVacation,
  IVacationResult,
  IWorkersVacation,
} from "../../../common/interfaces/payroll.interfaces";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { calculateBusinessDays } from "../../../common/utils/helpers";
import useVacationService from "../../../common/hooks/vacation-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
const EditVacationPage = () => {
  const [totalDays, setTotalDays] = useState<string>("0");
  const [vacation, setVacation] = useState<IVacationResult>(null);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchRecord);
  const { updateVacation } = useVacationService();
  const { getWorkerVacatioByParam } = useVacationService();
  const { setMessage } = useContext(AppContext);
  const { id, period } = useParams();
  const {
    handleSubmit,
    register,
    setValue: setValueRegister,
    formState: { errors },
    getValues,
    control,
    watch,
  } = useForm<IEditVacation>();
  const [startVacation, endVacation, refund] = watch([
    "dateFrom",
    "dateUntil",
    "refund",
  ]);
  const vacationInfo = async () => {
    const params = {
      workerId: id,
      period: period,
    };
    await getWorkerVacatioByParam(params)
      .then((response: ApiResponse<IVacationResult>) => {
        if (response?.operation?.code === EResponseCodes.OK) {
          setVacation(response.data);
          setValueRegister(
            "dateFrom",
            response.data.vacationDay
              .filter((day) => !day.paid)
              .sort((a, b) => b.id - a.id)[0]?.dateFrom
          );
          setValueRegister(
            "dateUntil",
            response.data.vacationDay
              .filter((day) => !day.paid)
              .sort((a, b) => b.id - a.id)[0]?.dateUntil
          );
          setValueRegister("observation",response.data.vacationDay
          .filter((day) => !day.paid)
          .sort((a, b) => b.id - a.id)[0]?.observation)
        }
      })
      .catch((err) => {
        setMessage({
          type: EResponseCodes.FAIL,
          title: "Crear período de vacaciones.",
          description:
            "Se ha presentado un error, por favor vuelve a intentarlo.",
          show: true,
          OkTitle: "Aceptar",
          background: true,
        });
      });
  };

  useEffect(() => {
    vacationInfo();
  }, []);

  useEffect(() => {
    const days = calculateBusinessDays(startVacation, endVacation);
    setValueRegister("totalDays", days);
    setValueRegister(
      "pendingTotalDays",
      vacation?.available +
        (vacation?.vacationDay
          .filter((day) => !day.paid)
          .sort((a, b) => b.id - a.id)[0]?.enjoyedDays -
          days)
    );
  }, [endVacation]);

  const onEdit = handleSubmit(async (data: IEditVacation) => {
    const dataEdit = {
      id: Number(vacation.id),
      idVacationDay: vacation?.vacationDay.map((day) => {
        if (!day.paid) return day.id;
      })[0],
      dateFrom: data?.dateFrom,
      dateUntil: data?.dateUntil,
      observation: data?.observation,
      available: data?.pendingTotalDays,
      refundTypes: data?.refund,
      refund:
        vacation?.vacationDay.map((day) => {
          if (!day.paid) return day.enjoyedDays;
        })[0] - Number(data?.totalDays),
      enjoyed:
        Number(vacation?.enjoyed) -
        (vacation?.vacationDay.map((day) => {
          if (!day.paid) return day.enjoyedDays;
        })[0] -
          Number(data?.totalDays)),
    };
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
                {...register("refund")}
                type="radio"
                id="refund"
                value="general"
                className="checkbox-basic"
              />{" "}
              <span className="text-black large bold">Reintegro general</span>
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
                action={() => {
                  navigate("/");
                }}
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
