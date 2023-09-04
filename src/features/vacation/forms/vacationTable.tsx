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
      value: row?.vacationDay.map((day) => {
        if (!day?.paid)
          return (
            <p key={day?.id}>
              {DateTime.fromISO(day?.dateFrom).toLocaleString()}
            </p>
          );
      }),
    },
    {
      title: "Hasta",
      value: row?.vacationDay.map((day) => {
        if (!day?.paid)
          return (
            <p key={day?.id}>
              {DateTime.fromISO(day?.dateUntil).toLocaleString()}
            </p>
          );
      }),
    },
    {
      title: "Total días",
      value: row?.vacationDay.map((day) => {
        if (!day?.paid) return <p key={day?.id}>{day?.enjoyedDays}</p>;
      }),
    },
  ];
  const daysCompensated = [
    {
      title: "Desde",
      value: row?.vacationDay.map((day) => {
        if (day?.paid)
          return (
            <p key={day?.id}>
              {DateTime.fromISO(day?.dateFrom)
                .toLocaleString()
                .replace(",", "")}
            </p>
          );
        else return;
      }),
    },
    {
      title: "Días compensados",
      value: row?.vacationDay.map((day) => {
        if (day?.paid) return <p key={day?.id}>{day?.enjoyedDays}</p>;
      }),
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
        <h2>Liquidación vacaciones</h2>
        <div>
          <h2 className="text-left">Días disfrutados</h2>
          <ResponsiveTable data={daysData} />
        </div>
        <div>
          <h2 className="text-left">Días compensados</h2>
          <ResponsiveTable data={daysCompensated} />
        </div>
        <ResponsiveTable data={refundDays} />
        <ResponsiveTable data={balanceDays} />

        <div>
          <TextAreaComponent
            idInput={"observation"}
            value={
              (row?.vacationDay
                .filter((day) => !day.paid)
                .sort((a, b) => b.id - a.id)[0]?.observation || "") +
              " " +
              row?.vacationDay
                .filter((day) => day.paid)
                .sort((a, b) => b.id - a.id)[0]?.observation
            }
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
