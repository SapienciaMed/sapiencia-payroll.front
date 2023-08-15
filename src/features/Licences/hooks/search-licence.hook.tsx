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
import { DateTime } from "luxon";
import { calculateDifferenceDays } from "../../../common/utils/helpers";

export default function useSearchLicenceData() {
  const tableComponentRef = useRef(null);

  const { setMessage } = useContext(AppContext);

  const { getLicenceById } = useLicencesService();

  const navigate = useNavigate();

  const showDetailLicence = async (id: number) => {
    const { operation, data } = await getLicenceById(id);

    if (operation.code === EResponseCodes.OK) {
      const dataResolution: DataItem[] = [
        {
          title: "Resolución No.",
          value: "XX del 31 de julio de 2023",
        },
      ];

      const dataInformation: DataItem[] = [
        {
          title: "Tipo y # documento",
          value: `${data[0].employment[0].worker.typeDocument} ${data[0].employment[0].worker.numberDocument}`,
        },
        {
          title: "Nombre empleado",
          value: `${data[0].employment[0].worker.firstName} ${data[0].employment[0].worker.secondName} ${data[0].employment[0].worker.firstName}`,
        },

        {
          title: "Tipo de licencia",
          value: data[0].licenceType[0].name,
        },
        {
          title: "Estado",
          value: data[0].licenceState,
        },
      ];

      const dataPeriod: DataItem[] = [
        {
          title: "Fecha inicio",
          value: DateTime.fromISO(data[0].dateStart).toLocaleString(),
        },
        {
          title: "Fecha fin",
          value: DateTime.fromISO(data[0].dateEnd).toLocaleString(),
        },

        {
          title: "Total días",
          value: calculateDifferenceDays(data[0].dateStart, data[0].dateEnd),
        },
      ];

      return setMessage({
        title: "Detalle Vacaciones",
        show: true,
        OkTitle: "Aceptar",
        description: (
          <div className="container-modal_description">
            <ResponsiveTable data={dataResolution} />
            <div>
              <h3 className="text-left  padding-left_16">Información</h3>
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
        return <>{row.licenceType[0].name}</>;
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
  };
}
