import { useForm } from "react-hook-form";
import {
  ILicenceFilters,
  ILicenceResult,
} from "../../../common/interfaces/payroll.interfaces";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import useLicencesService from "../../../common/hooks/licences-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import {
  ResponsiveTable,
  DataItem,
} from "../../../common/components/Form/table-detail.component";
import { TextAreaComponent } from "../../../common/components/Form";
import { calculateDifferenceDays } from "../../../common/utils/helpers";

export default function useSearchLicenceData() {
  const tableComponentRef = useRef(null);
  const [tableView, setTableView] = useState<boolean>(false);

  const { setMessage } = useContext(AppContext);

  const { getLicenceById } = useLicencesService();

  const navigate = useNavigate();

  const showDetailLicence = async (id: number) => {
    const { operation, data } = await getLicenceById(id);

    if (operation.code === EResponseCodes.OK) {
      const dataResolution: DataItem[] = [
        {
          title: "Resolución No.",
          value: `${data[0].resolutionNumber}`,
        },
      ];

      const dataInformation: DataItem[] = [
        {
          title: <span className="text-left">Tipo y # documento</span>,
          value: `${data[0].employment.worker.typeDocument} ${data[0].employment.worker.numberDocument}`,
        },
        {
          title: <span className="text-left">Nombre empleado</span>,
          value: `${data[0].employment.worker.firstName} ${data[0].employment.worker.secondName} ${data[0].employment.worker.surname} ${data[0].employment.worker.secondSurname}`,
        },

        {
          title: <span className="text-left">Tipo de licencia</span>,
          value: data[0].licenceType.name,
        },
        {
          title: <span className="text-left">Estado</span>,
          value: data[0].licenceState,
        },
      ];

      const dataPeriod: DataItem[] = [
        {
          title: "Fecha inicio",
          value: data[0].dateStart,
        },
        {
          title: "Fecha fin",
          value: data[0].dateEnd,
        },

        {
          title: "Total días",
          value: `${calculateDifferenceDays(
            data[0].dateStart,
            data[0].dateEnd
          )}`,
        },
      ];

      return setMessage({
        title: "Detalle licencia",
        show: true,
        OkTitle: "Aceptar",
        description: (
          <div className="container-modal_description">
            <ResponsiveTable data={dataResolution} />
            <div>
              <h3 className="">Información</h3>
              <ResponsiveTable data={dataInformation} />
            </div>
            <div>
              <h3 className="text-left  padding-left_16">Período</h3>
              <ResponsiveTable data={dataPeriod} />
            </div>
            <TextAreaComponent
              label={"Observaciones"}
              idInput=""
              value={`${data[0].observation}`}
              disabled={true}
              className="text-area-basic"
              classNameLabel="text-black big bold"
              rows={5}
            />
          </div>
        ),
        size: "large",
        background: true,
      });
    }
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<ILicenceFilters>();
  const tableColumns: ITableElement<ILicenceResult>[] = [
    {
      fieldName: "employment.worker.numberDocument",
      header: "Tipo y # documento",
      renderCell: (row) => {
        return (
          <>
            {row.employment.worker.typeDocument +
              " " +
              row.employment.worker.numberDocument}
          </>
        );
      },
    },
    {
      fieldName: "row.employment.worker.firstName",
      header: "Nombres y Apellidos",
      renderCell: (row) => {
        return (
          <>
            {row.employment.worker.firstName +
              " " +
              row.employment.worker.secondName +
              " " +
              row.employment.worker.surname +
              " " +
              row.employment.worker.secondSurname}
          </>
        );
      },
    },
    {
      fieldName: "licenceType.id",
      header: "Tipo de licencia",
      renderCell: (row) => {
        return <>{row.licenceType.name}</>;
      },
    },
    {
      fieldName: "licenceState",
      header: "Estado",
      renderCell: (row) => {
        return <>{row.licenceState}</>;
      },
    },
  ];
  const tableActions: ITableAction<ILicenceResult>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        showDetailLicence(row.id);
      },
    },
  ];

  const [codEmployment, idLicenceType] = watch([
    "codEmployment",
    "idLicenceType",
  ]);
  const [stateLicence] = watch(["licenceState"]);
  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const onSubmit = handleSubmit(async (data: ILicenceFilters) => {
    loadTableData(data);
  });

  return {
    onSubmit,
    tableActions,
    tableColumns,
    navigate,
    tableComponentRef,
    reset,
    control,
    errors,
    tableView,
    setTableView,
    codEmployment,
    idLicenceType,
    stateLicence,
  };
}
