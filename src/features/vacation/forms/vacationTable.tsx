import React from "react";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { IWorkersVacationDetail } from "../../../common/interfaces/payroll.interfaces";

const VacationTable = (props: { rows: IWorkersVacationDetail[] }) => {
  const { rows } = props;
  return (
    <>
      <table className="details-table">
        <h1>
          hola mundo
          {rows.map((row) => {
            return (
              <>
                <div key={row.id}>
                <h3>Datos Colaborador</h3>
                  <table>
                    <tr>
                      <th>{"Nro. documento"}</th>
                      <th>{"Nombre"}</th>
                      <th>{"Cargo"}</th>
                      <th>{"Salario"}</th>
                      <th>{"Periodo"}</th>
                    </tr>
                    <tr>
                      <td>{row.worker.documentWorker}</td>
                      <td>{row.worker.nameWorker}</td>
                      <td>{row.worker.charge}</td>
                      <td>{row.worker.salary}</td>
                      <td>{row.worker.period}</td>
                    </tr>
                  </table>
                  <h2>Liquidación vacaciones</h2>
                  <h3>Dias Disfrutados</h3>
                  <table>
                    <tr>
                      <th>Desde</th>
                      <th>Hasta</th>
                      <th>Total días</th>
                    </tr>
                    <tr>
                      <td>{row.enjoyedDays.startDate}</td>
                      <td>{row.enjoyedDays.endDate}</td>
                      <td>{row.enjoyedDays.totalDays}</td>
                    </tr>
                  </table>
                  <h3>Dias Compensados</h3>
                  <table>
                    <tr>
                      <th>Desde</th>
                      <th>Días compensados</th>
                    </tr>
                    <tr>
                      <td>{row.compensatedDays.startDateCompensatedDays}</td>
                      <td>{row.compensatedDays.totalCompensatoryDays}</td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <th>Días pendientes</th>
                      <th>Reintegro</th>
                    </tr>
                    <tr>
                      <td>{row.refund.pendingDays}</td>
                      <td>{row.refund.refundDays}</td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <th>Saldo anterior</th>
                      <th>Días ganados</th>
                      <th>Saldo actual</th>
                    </tr>
                    <tr>
                      <td>{row.balances.previousBalance}</td>
                      <td>{row.balances.daysEarned}</td>
                      <td>{row.balances.currentBalance}</td>
                    </tr>
                  </table>
                  <TextAreaComponent idInput={"observation"} value={row.observation} label={"Observaciones"}/>
                </div>
              </>
            );
          })}
        </h1>
      </table>
      <TextAreaComponent idInput={"observation"} label={"observaciones"} />
    </>
  );
};

export default VacationTable;
