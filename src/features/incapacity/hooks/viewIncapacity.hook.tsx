import { useContext, useEffect } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import useIncapacityService from "../../../common/hooks/incapacity-service.hook";
import { IGetIncapacity } from "../../../common/interfaces/payroll.interfaces";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { calculateDifferenceDays } from "../../../common/utils/helpers";
import { ResponsiveTable } from "../../../common/components/Form/table-detail.component";
import { TextAreaComponent } from "../../../common/components/Form";

export default function useViewIncapacityDetail() {
  const { setMessage } = useContext(AppContext);

  const { getByIdIncapacity } = useIncapacityService();

  const navigate = useNavigate();

  const dataFormated = (data: IGetIncapacity) => {
    const worker = [
      {
        title: "Numero de documento",
        value: data.employment?.worker?.numberDocument,
      },
      {
        title: "Nombre empleado",
        value: `${data.employment?.worker?.firstName} ${data.employment?.worker?.secondName}`,
      },
      {
        title: "Origen incapacidad",
        value: data.typeIncapacity.name,
      },
    ];

    const calculateDaysIncapacity = calculateDifferenceDays(
      data.dateInitial,
      data.dateFinish
    );

    const dates = [
      {
        title: "Fecha de inicio",
        value: DateTime.fromISO(data.dateInitial).toLocaleString(),
      },
      {
        title: "Fecha de fin",
        value: DateTime.fromISO(data.dateFinish).toLocaleString(),
      },
      {
        title: "Total días",
        value: calculateDaysIncapacity === 0 ? 1 : calculateDaysIncapacity,
      },
    ];

    const prorroga = [
      {
        title: "Prorroga",
        value: data.isExtension ? "Si" : "No",
      },
    ];

    return {
      worker,
      dates,
      prorroga,
    };
  };

  const handleModalViewIncapacity = (data: IGetIncapacity) => {
    if (Object.keys(data).length <= 0) return;

    const { worker, dates, prorroga } = dataFormated(data);

    setMessage({
      title: "Detalle de incapacidad",
      show: true,
      OkTitle: "Aceptar",
      description: (
        <div className="container-modal_description">
          <ResponsiveTable data={worker} />
          <div>
            <h3 className="text-left  padding-left_16">Periodo</h3>
            <ResponsiveTable data={dates} />
          </div>
          <ResponsiveTable data={prorroga} />
          <TextAreaComponent
            label={"Observaciones"}
            idInput=""
            value={`${data.comments}`}
            disabled={true}
            className="text-area-basic"
            classNameLabel="text-black big bold"
            rows={5}
          />
        </div>
      ),
      size: "big",
      onOk: () => {
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      background: true,
    });
  };

  const showDetailIncapacity = async (id: number) => {
    const { data } = await getByIdIncapacity(id);
    return handleModalViewIncapacity(data);
  };

  return {
    showDetailIncapacity,
    navigate,
  };
}
