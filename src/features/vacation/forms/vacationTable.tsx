import React from "react";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { IWorkersVacationDetail } from "../../../common/interfaces/payroll.interfaces";
import { DateTime } from "luxon";
import { ResponsiveTable } from "../../../common/components/Form/table-detail.component";

const VacationTable = ({ row }: { row: IWorkersVacationDetail }) => {
  const workerData = [
    {
      title: "Nro. documento",
      value: `${row?.employment.worker.numberDocument}`,
    },
    {
      title: "Nombre",
      value: `${
        row?.employment.worker.firstName + " " + row.employment.worker.surname
      }`,
    },
    { title: "Cargo", value: `${row?.employment.charges[0].name}` },
    { title: "Salario", value: `${row?.employment.salary}` },
    { title: "Periodo", value: `${row?.period}` },
  ];
  const daysData = [
    {
      title: "Desde",
      value: (`${row?.vacationDay.map((day) => {
        if (!day?.paid) return (DateTime.fromISO(day?.dateFrom).toLocaleString());
        else return;
      })}`).replace(",",""),
    },
    {
      title: "Hasta",
      value: (`${row?.vacationDay.map((day) => {
        if (!day?.paid)
          return (DateTime.fromISO(day?.dateUntil).toLocaleString());
        else return;
      })}`).replace(",",""),
    },
    {
      title: "Total días",
      value: (`${row?.vacationDay.map((day) => {
        if (!day?.paid) return (`${day?.enjoyedDays}`);
        else return;
      })}`).replace(",",""),
    },
  ];
  const daysCompensated = [
    {
      title: "Desde",
      value: (`${row?.vacationDay.map((day) => {
        if (day?.paid) return (DateTime.fromISO(day?.dateFrom).toLocaleString()).replace(",","");
        else return;
      })}`).replace(",",""),
    },
    {
      title: "Días compensados",
      value: (`${row?.vacationDay.map((day) => {
        if (day?.paid) return (`${day?.enjoyedDays}`).replace(",","");
        else return;
      })}`).replace(",",""),
    },
  ];
  const refundDays = [
    {
      title: "Días pendientes",
      value: `${row?.available}`,
    },
    { title: "Reintegro", value: `${row?.refund ? "si" : "no"}` },
  ];
  const balanceDays = [
    { title: "Saldo anterior", value: `${row?.periodFormer}` },
    { title: "Días ganados", value: `${row?.days}` },
    { title: "Saldo actual", value: `${row?.available}` },
  ];
  return (
    <>
      <div>
        <ResponsiveTable data={workerData} />
        <ResponsiveTable data={daysData} />
        <ResponsiveTable data={daysCompensated} />
        <ResponsiveTable data={refundDays} />
        <ResponsiveTable data={balanceDays} />

        <div>
          <TextAreaComponent
            idInput={"observation"}
            value={row?.vacationDay
              .map((day) => {
                let observation = day?.observation || "";
                return observation;
              })
              .join("\n")}
            className="text-area-basic"
            label={"Observaciones"}
            classNameLabel="text-black big bold text-left"
            rows={3}
            disabled={true}
          />
        </div>
      </div>
    </>
  );
};

export default VacationTable;
