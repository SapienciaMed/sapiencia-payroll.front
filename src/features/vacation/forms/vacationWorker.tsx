import React, { useContext, useEffect, useRef, useState } from "react";
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
import {
  ICreateVacation,
  IVacation,
  IVacationDay,
  IWorkersVacation,
} from "../../../common/interfaces/payroll.interfaces";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import {
  addBusinessDays,
  calculateBusinessDays,
} from "../../../common/utils/helpers";
import useListData from "../hooks/list.hook";
import useVacationService from "../../../common/hooks/vacation-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import { AppContext } from "../../../common/contexts/app.context";
import { ResponsiveTable } from "../../../common/components/Form/table-detail.component";

const SearchWorker = () => {
  const [pendingDays, setPendingDays] = useState<string>("0");
  const [vacation, setVacation] = useState<IVacation>(null);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchRecord);
  const { setMessage } = useContext(AppContext);
  const { activeWorkerList, listPeriods } = useListData();
  const { getWorkerVacatioByParam, createVacation } = useVacationService();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue: setValueRegister,
    watch,
  } = useForm<IWorkersVacation>({ resolver });
  const [checkEnjoyedDays, checkCompensatoryDays] = watch([
    "checkEnjoyedDays",
    "checkCompensatoryDays",
  ]);
  const [startVacation, endVacation, compensatoryDays, totalDaysEnjoyed] =
    watch([
      "startDate",
      "endDate",
      "totalCompensatoryDays",
      "totalDaysEnjoyed",
    ]);
  const calculateDays = () => {
    if (totalDaysEnjoyed > vacation?.available) {
      alert("que haces cabron toy chiquito");
      //setValueRegister("totalCompensatoryDays",0)
    }
  };
  useEffect(() => {
    calculateDays();
  }, []);

  useEffect(() => {
    const days = calculateBusinessDays(startVacation, endVacation);
    setValueRegister("totalDaysEnjoyed", Number(`${days ? days : 0}`));
    if (compensatoryDays > vacation?.available - totalDaysEnjoyed) {
      setValueRegister("totalCompensatoryDays", 0);
    }
  }, [endVacation]);

  useEffect(() => {
    setValueRegister("endDate", "");
  }, [startVacation]);

  useEffect(() => {
    const totalDaysEnjoyedValue = totalDaysEnjoyed ?? 0;
    const compensatoryDaysValue = compensatoryDays ?? 0;
    const availableDays = vacation?.available ?? 0;
    if (compensatoryDays > availableDays - totalDaysEnjoyed) {
      setValueRegister("totalCompensatoryDays", 0);
    }
    setPendingDays(
      `${
        Number(availableDays) -
        (Number(compensatoryDaysValue) + Number(totalDaysEnjoyedValue))
      }`
    );
  }, [compensatoryDays]);

  const onSubmit = handleSubmit(async (data: IWorkersVacation) => {
    const params = {
      workerId: data.idWorker,
      period: parseInt(data.period),
    };
    await getWorkerVacatioByParam(params)
      .then((response: ApiResponse<IVacation>) => {
        if (
          response &&
          response?.operation?.code === EResponseCodes.OK &&
          response?.data
        ) {
          setVacation(response.data);
        } else {
          setMessage({
            type: EResponseCodes.FAIL,
            title: "Crear período de vacaciones.",
            description: "No se genero Resultados en la busqueda",
            show: true,
            OkTitle: "Aceptar",
            background: true,
          });
          setVacation({} as IVacation);
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
  });

  const handleModal = () => {
    setMessage({
      title: "Se va cancelar el perido de vaciones",
      description: `Estas seguro de cancelar`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("../");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      onCancel: () => {
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      background: true,
    });
  };

  const onCreate = handleSubmit(async (data: IWorkersVacation) => {
    const dataVacationDays = [];
    const totalEnjoyedDays =
      Number(
        isNaN(data?.totalDaysEnjoyed) ? 0 : Number(data?.totalDaysEnjoyed)
      ) + Number(data?.totalCompensatoryDays ?? 0);
    if (data.checkEnjoyedDays)
      dataVacationDays.push({
        codVacation: vacation.id,
        dateFrom: data.startDate,
        dateUntil: data.endDate,
        enjoyedDays: data.totalDaysEnjoyed,
        paid: false,
        observation: data.observation,
      });
    if (data.checkCompensatoryDays)
      dataVacationDays.push({
        codVacation: vacation.id,
        dateFrom: data.startDate,
        enjoyedDays: data.totalCompensatoryDays,
        paid: true,
        observation: data.observation,
      });
    const dataVacation = {
      vacationDay: dataVacationDays as IVacationDay[],
      enjoyedDays: totalEnjoyedDays,
      avaibleDays: Number(vacation?.available) - Number(totalEnjoyedDays),
    };

    await createVacation(dataVacation)
      .then((response: ApiResponse<ICreateVacation>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setMessage({
            type: EResponseCodes.OK,
            title: "Vacaciones.",
            description: "periodo de vacaciones creado con exito.",
            show: true,
            OkTitle: "Aceptar",
            onOk() {
              navigate("../");
              setMessage((prev) => {
                return { ...prev, show: false };
              });
            },
            background: true,
          });
        } else {
          setMessage({
            type: EResponseCodes.FAIL,
            title: "Error al crear periodo.",
            description:
              "Se ha presentado un error, por favor vuelve a intentarlo.",
            show: true,
            OkTitle: "Aceptar",
            background: true,
          });
        }
      })
      .catch((err) => {
        setMessage({
          type: EResponseCodes.FAIL,
          title: "Error al crear el periodo",
          description:
            "Se ha presentado un error, por favor vuelve a intentarlo.",
          show: true,
          OkTitle: "Aceptar",
          background: true,
        });
      });
  });
  const vacationData = [
    { title: "Saldo anterior", value: `${vacation?.periodFormer ?? 0}` },
    { title: "Días ganados", value: `${vacation?.days ?? 0}` },
    { title: "Saldo actual", value: `${vacation?.available ?? 0}` },
  ];

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
                <ButtonComponent
                  value={"Buscar"}
                  className="button-save big disabled-black"
                />
              </div>
            </FormComponent>
          </div>

          <div className="container-sections-forms">
            <ResponsiveTable data={vacationData} />
          </div>
        </div>
        <FormComponent
          id="createVacationForm"
          className="form-signIn"
          action={onCreate}
        >
          <div className=" grid-form-3-container gap-25 container-sections-forms  m-24px">
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
              minDate={startVacation}
              maxDate={addBusinessDays(
                startVacation ? startVacation : new Date(),
                vacation ? vacation?.available : 0
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

          <div className="grid-form-3-container gap-25 container-sections-forms m-24px">
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
          <div className="m-24px">
            <TextAreaComponent
              idInput={"observation"}
              className="text-area-basic"
              classNameLabel="text-black big bold"
              label="Observaciones"
              register={register}
              disabled={!checkCompensatoryDays && !checkEnjoyedDays}
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
    </>
  );
};

export default SearchWorker;
