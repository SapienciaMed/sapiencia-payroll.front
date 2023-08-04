import React from "react";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { IWorkersVacationDetail } from "../../../common/interfaces/payroll.interfaces";
import { DateTime } from "luxon";

const VacationTable = ({ row }: { row: IWorkersVacationDetail }) => {
  return (
    <>
      <div>
        <h2>Datos Colaborador</h2>
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
              {row?.vacationDay.reduce((pendingDays, day) => {
                const enjoyedDays = day?.enjoyedDays || 0;
                return pendingDays - enjoyedDays;
              }, row?.available || 0)}
            </td>
            <td>{row?.periodFormer ? "si" : "no"}</td>
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
        </div>
      </div>
    </>
  );
};

export default VacationTable;
