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
import { IVacation, IWorkersVacation } from "../../../common/interfaces/payroll.interfaces";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { calculateBusinessDays } from "../../../common/utils/helpers";
import useListData from "../hooks/list.hook";
import useVacationService from "../../../common/hooks/vacation-service.hook";

const SearchWorker = () => {
  const [totalDays, setTotalDays] = useState<string>("0");
  const [pendingDays, setPendingDays] = useState<string>("0");
  const [vacation, setVacation] = useState<IVacation>(null);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchRecord);
  const { activeWorkerList, listPeriods } = useListData();
  const { getWorkerVacatioByParam,createVacation } = useVacationService();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  } = useForm<IWorkersVacation>({ resolver });
  const [checkEnjoyedDays, checkCompensatoryDays] = watch([
    "checkEnjoyedDays",
    "checkCompensatoryDays",
  ]);
  const [startVacation, endVacation, compensatoryDays] = watch([
    "startDate",
    "endDate",
    "totalCompensatoryDays",
  ]);

  useEffect(() => {
    const days = calculateBusinessDays(startVacation, endVacation);
    setTotalDays(`${days ? days : 0}`);
  }, [startVacation, endVacation]);

  useEffect(() => {
    setPendingDays(
      `${compensatoryDays ? vacation?.available - compensatoryDays : 0}`
    );
  }, [compensatoryDays]);

  const onSubmit = handleSubmit(async (data: IWorkersVacation) => {
    const params = {
      worker: data.idWorker,
      period: parseInt(data.period),
    };
    setVacation((await getWorkerVacatioByParam(params)).data);
  });

  const onCreate = handleSubmit(async(data:IWorkersVacation)=>{
    const dataVacation = []
    if(data.checkEnjoyedDays)
    dataVacation.push({codVacation: vacation.id,
    dateFrom: data.startDate,
    dateUntil: data.endDate,
    enjoyedDays: totalDays,
    paid: false,
    observation: data.observation
    })
    if(data.checkCompensatoryDays)
    dataVacation.push({codVacation: vacation.id,
      dateFrom: data.startDate,
      enjoyedDays: data.totalCompensatoryDays,
      paid: true,
      observation: data.observation
      })
    await createVacation({"vacationDay":dataVacation})
  })

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
              id="searchWorkerForm"
              className="form-signIn"
              action={onSubmit}
            >
              <div className="container-sections-forms">
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
              </div>
              <div className="button-save-container-display">
                <ButtonComponent value={"Buscar"} className="button-save big disabled-black" />
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
                <td className="th-content">{vacation?.periodFormer}</td>
                <td className="th-content">{vacation?.days}</td>
                <td className="th-content">{vacation?.available}</td>
              </tr>
            </table>
          </div>
        </div>
        <FormComponent id="createVacationForm"
              className="form-signIn"
              action={onCreate}>
        <div className=" grid-form-3-container gap-25 container-sections-forms  m-24px">
          <div className="grid-span-3-columns">
            <input
              {...register("checkEnjoyedDays")}
              type="checkbox"
              className="checkbox-basic"
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
          />
          <DatePickerComponent
            idInput={"endDate"}
            control={control}
            label={"Hasta"}
            errors={errors}
            classNameLabel="text-black big break-line bold"
            className="dataPicker-basic  medium "
            disabled={!checkEnjoyedDays}
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
                  typeInput="text"
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
        </FormComponent>
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
        <ButtonComponent value={"Guardar"} type="submit" form="createVacationForm" className="button-save big disabled-black" />
      </div>
      
    </>
  );
};

export default SearchWorker;
