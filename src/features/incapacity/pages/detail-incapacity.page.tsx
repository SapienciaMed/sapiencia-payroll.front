import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { IGetIncapacity } from "../../../common/interfaces/payroll.interfaces";
import { DateTime } from "luxon";
import { calculateDifferenceDays } from "../../../common/utils/helpers";

interface IPropsIncapacityDetailPage {
  data: IGetIncapacity;
}

const IncapacityDetailPage = ({ data }: IPropsIncapacityDetailPage) => {
  return (
    <>
      <table className="table-items">
        <tr>
          <th>Numero de documento</th>
          <th>Nombre empleado</th>
          <th>Origen incapacidad</th>
        </tr>
        <tr>
          <td>{data.employment?.worker?.numberDocument}</td>
          <td>
            {`${data.employment?.worker?.firstName} ${data.employment?.worker?.secondName}`}
          </td>
          <td>{data.typeIncapacity.name}</td>
        </tr>
      </table>

      <h3 className="text-left">Periodo</h3>
      <table className="table-items">
        <tr>
          <th>Fecha inicio</th>
          <th>Fecha fin</th>
          <th>Total días</th>
        </tr>
        <tr>
          <td>{DateTime.fromISO(data.dateInitial).toLocaleString()}</td>
          <td>{DateTime.fromISO(data.dateFinish).toLocaleString()}</td>
          <td>{calculateDifferenceDays(data.dateInitial, data.dateFinish)}</td>
        </tr>
      </table>

      <table className="table-items">
        <tr>
          <th>Prorroga</th>
        </tr>
        <tr>
          <td>{data.isExtension ? "Si" : "No"}</td>
        </tr>
      </table>
      <div>
        <TextAreaComponent
          idInput={""}
          value={data.comments}
          className="text-area-basic"
          label={"Observaciones"}
          classNameLabel="text-black big bold text-left"
          rows={3}
          disabled={true}
        />
      </div>
    </>
  );
};

export default IncapacityDetailPage;
