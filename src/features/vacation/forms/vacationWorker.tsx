import React, { useEffect, useRef, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
import { IWorkersVacation } from "../../../common/interfaces/payroll.interfaces";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import {
  calculateDifferenceDays,
  calculateDifferenceYear,
} from "../../../common/utils/helpers";
import useListData from "../hooks/list.hook";
import useVacationService from "../../../common/hooks/vacation-service.hook";

const SearchWorker = () => {
  const [totalDays, setTotalDays] = useState<string>("0");
  const [vacation, setVacation] = useState(null)
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchRecord);
  const {activeWorkerList,listPeriods} = useListData()
  const {getWorkerVacatioByParam} = useVacationService()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue: setValueRegister,
    control,
    reset,
    watch,
  } = useForm<IWorkersVacation>({ resolver });
  const [startVacation, endVacation, checkEnjoyedDays, checkCompensatoryDays] =
    watch([
      "startDate",
      "endDate",
      "checkEnjoyedDays",
      "checkCompensatoryDays",
    ]);

  useEffect(() => {
    const days = calculateDifferenceDays(startVacation, endVacation);
    setTotalDays(`${days ? days : 0}`);
  }, [startVacation, endVacation]);

  const onSubmit = handleSubmit(async (data:IWorkersVacation) => {
    const params ={
    "worker": data.idWorker,
    "period":parseInt(data.period)
    }
    setVacation(await getWorkerVacatioByParam(params))
  });

  return (
    <>
      <div className="container-sections-forms m-24px">
        <div>
          <span className="text-black extra-large bold">
            Crear periodo de vacaciones
          </span>
        </div>
        <div className="container-sections-forms m-24px">
          <div>
            <FormComponent
              id="searchRecordForm"
              className="form-signIn"
              action={onSubmit}
            >
              <div className="container-sections-forms">
                <div className="grid-form-2-container gap-25">
                  <Controller
                    name="idWorker"
                    control={control}
                    render={({ field }) => (
                      <SelectComponent
                        id={field.name}
                        idInput={field.name}
                        label={<>Colaborador</>}
                        register={register}
                        errors={errors}
                        data={activeWorkerList}
                        className="select-basic medium"
                        classNameLabel="text-black big bold"
                        value={`${field.value}`}
                        setValueRegister={setValueRegister}
                        onchange={field.onChange}
                        placeholder="Seleccione"
                        filter={true}
                      />
                    )}
                  />
                  <Controller
                    name="period"
                    control={control}
                    render={({ field }) => (
                      <SelectComponent
                        id={field.name}
                        idInput={field.name}
                        label={<>Periodo</>}
                        register={register}
                        errors={errors}
                        data={listPeriods}
                        className="select-basic medium"
                        classNameLabel="text-black big bold"
                        value={field.value}
                        setValueRegister={setValueRegister}
                        onchange={field.onChange}
                        placeholder="Seleccione"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="button-save-container-display">
                <ButtonComponent value={"Buscar"} className="button-save big" />
              </div>
            </FormComponent>
          </div>

          <div className="container-sections-forms">
            <table className="table-items ">
              <tr>
                <th className="th-title">Saldo anterior</th>
                <th className="th-title">Días ganados</th>
                <th className="th-title">Saldo actual</th>
              </tr>
              <tr>
                <td className="th-content">{vacation?.data?.periodFormer}</td>
                <td className="th-content">{vacation?.data?.days}</td>
                <td className="th-content">{vacation?.data?.available}</td>
              </tr>
            </table>
          </div>
        </div>

        <div className=" grid-form-3-container gap-25 container-sections-forms  m-24px">
          <div className="grid-span-3-columns">
            <input
              {...register("checkEnjoyedDays")}
              type="checkbox"
              className="checkbox-basic"
            />{" "}
            <span className="text-black large bold">Dias disfrutados</span>
          </div>
          <Controller
            control={control}
            name={"startDate"}
            render={({ field }) => {
              return (
                <DatePickerComponent
                  id={field.name}
                  idInput={field.name}
                  value={field.value}
                  label="Desde"
                  register={register}
                  errors={errors}
                  classNameLabel="text-black big break-line bold"
                  setValueRegister={setValueRegister}
                  onchange={field.onChange}
                  className="dataPicker-basic medium"
                  disabled={!checkEnjoyedDays}
                />
              );
            }}
          />
          <Controller
            control={control}
            name={"endDate"}
            render={({ field }) => {
              return (
                <DatePickerComponent
                  id={field.name}
                  idInput={field.name}
                  value={field.value}
                  label="Hasta"
                  register={register}
                  errors={errors}
                  classNameLabel="text-black big break-line bold"
                  setValueRegister={setValueRegister}
                  onchange={field.onChange}
                  className="dataPicker-basic medium"
                  disabled={!checkEnjoyedDays}
                />
              );
            }}
          />
          <InputComponent
            idInput={"totalDays"}
            className="input-basic medium"
            typeInput="text"
            classNameLabel="text-black big bold"
            label="Total días"
            disabled={true}
            errors={errors}
            value={totalDays}
          />
        </div>

        <div className="grid-form-3-container gap-25 container-sections-forms m-24px">
          <div className="grid-span-3-columns">
            <input
              {...register("checkCompensatoryDays")}
              type="checkbox"
              className="checkbox-basic"
            />
            <span className="text-black large bold">Dias compensados</span>
          </div>
          <Controller
            control={control}
            name={"startDateCompensatedDays"}
            render={({ field }) => {
              return (
                <DatePickerComponent
                  id={field.name}
                  idInput={field.name}
                  value={field.value}
                  label="Días compensatorios"
                  register={register}
                  errors={errors}
                  classNameLabel="text-black big break-line bold"
                  setValueRegister={setValueRegister}
                  onchange={field.onChange}
                  className="dataPicker-basic medium"
                  disabled={!checkCompensatoryDays}
                />
              );
            }}
          />
          <InputComponent
            idInput={"totalCompensatoryDays"}
            className="input-basic medium"
            typeInput="number"
            classNameLabel="text-black big bold"
            label="Total días compensatorios"
            register={register}
            disabled={!checkCompensatoryDays}
            errors={errors}
          />
          <InputComponent
            idInput={"pendingDays"}
            className="input-basic medium"
            typeInput="text"
            classNameLabel="text-black big bold"
            label="Días pendientes"
            disabled={true}
            errors={errors}
            value={`${vacation?.data?.available ? vacation?.data?.available - watch('totalCompensatoryDays') :0}`}
          />
        </div>
        <div className="m-24px">
          <TextAreaComponent
            idInput={"observation"}
            className="text-area-basic"
            classNameLabel="text-black big bold"
            label="Observaciones"
            register={register}
            disabled={false}
            errors={errors}
            rows={5}
          />
        </div>
      </div>
      <div className="button-save-container-display mr-24px ">
        <ButtonComponent
          value={"Cancelar"}
          type="button"
          className="button-clean bold"
          action={() => {
            navigate("/");
          }}
        />
        <ButtonComponent value={"Guardar"} className="button-save big" />
      </div>
    </>
  );
};

export default SearchWorker;
