import React from "react";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { IWorkersVacationDetail } from "../../../common/interfaces/payroll.interfaces";
import { DateTime } from "luxon";
import { ResponsiveTable } from "../../../common/components/Form/table-detail.component";

const VacationTable = ({ row }: { row: IWorkersVacationDetail }) => {
  const data = [
    { title: "Nombre", value: "Juan" },
    { title: "Edad", value: "30" },
    { title: "País", value: "España" },
    { title: "Correo", value: "juan@example.com" },
  ];
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
      value: `${row?.vacationDay.map((day) => {
        if (!day?.paid) return DateTime.fromISO(day?.dateFrom).toLocaleString();
        else return;
      })}`,
    },
    {
      title: "Hasta",
      value: `${row?.vacationDay.map((day) => {
        if (!day?.paid)
          return DateTime.fromISO(day?.dateUntil).toLocaleString();
        else return;
      })}`,
    },
    {
      title: "Total días",
      value: `${row?.vacationDay.map((day) => {
        if (!day?.paid) return day?.enjoyedDays;
        else return;
      })}`,
    },
  ];
  const daysCompensated = [
    {
      title: "Desde",
      value: `${row?.vacationDay.map((day) => {
        if (day?.paid) return DateTime.fromISO(day?.dateFrom).toLocaleString();
        else return;
      })}`,
    },
    {
      title: "Días compensados",
      value: `${row?.vacationDay.map((day) => {
        if (day?.paid) return day?.enjoyedDays;
        else return;
      })}`,
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
        {/* <h2>Datos Colaborador</h2>
        <table className="table-items">
          <tr>
            <th className="th-items">{"Nro. documento"}</th>
            <th className="th-items">{"Nombre"}</th>
            <th className="th-items">{"Cargo"}</th>
            <th className="th-items">{"Salario"}</th>
            <th className="th-items">{"Periodo"}</th>
          </tr>
          <tr>
            <td>{row?.employment.worker.numberDocument}</td>
            <td>
              {row?.employment.worker.firstName +
                " " +
                row.employment.worker.surname}
            </td>
            <td>{row?.employment.charges[0].name}</td>
            <td>{row?.employment.salary}</td>
            <td>{row?.period}</td>
          </tr>
        </table>
        <h2>Liquidación vacaciones</h2>
        <h3 className="text-left">Dias Disfrutados</h3>
        <table className="table-items">
          <tr>
            <th className="th-items">Desde</th>
            <th className="th-items">Hasta</th>
            <th className="th-items">Total días</th>
          </tr>
          <tr>
            <td>
              {row?.vacationDay.map((day) => {
                if (!day?.paid)
                  return DateTime.fromISO(day?.dateFrom).toLocaleString();
                else return;
              })}
            </td>
            <td>
              {row?.vacationDay.map((day) => {
                if (!day?.paid)
                  return DateTime.fromISO(day?.dateUntil).toLocaleString();
                else return;
              })}
            </td>
            <td>
              {row?.vacationDay.map((day) => {
                if (!day?.paid) return day?.enjoyedDays;
                else return;
              })}
            </td>
          </tr>
        </table>
        <h3 className="text-left">Dias Compensados</h3>
        <table className="table-items">
          <tr>
            <th className="th-items">Desde</th>
            <th className="th-items">Días compensados</th>
          </tr>
          <tr>
            <td>
              {row?.vacationDay.map((day) => {
                if (day?.paid)
                  return DateTime.fromISO(day?.dateFrom).toLocaleString();
                else return;
              })}
            </td>
            <td>
              {row?.vacationDay.map((day) => {
                if (day?.paid) return day?.enjoyedDays;
                else return;
              })}
            </td>
          </tr>
        </table>
        <table className="table-items">
          <tr>
            <th className="th-items">Días pendientes</th>
            <th className="th-items">Reintegro</th>
          </tr>
          <tr>
            <td>
              {row?.available}
            </td>
            <td>{row?.refund ? "si" : "no"}</td>
          </tr>
        </table>
        <table className="table-items">
          <tr>
            <th className="th-items">Saldo anterior</th>
            <th className="th-items">Días ganados</th>
            <th className="th-items">Saldo actual</th>
          </tr>
          <tr>
            <td>{row?.periodFormer}</td>
            <td>{row?.days}</td>
            <td>{row?.available}</td>
          </tr>
        </table>
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
        </div> */}
      </div>
    </>
  );
};

export default VacationTable;
