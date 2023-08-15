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


export default function useSearchLicenceData() {

  const tableComponentRef = useRef(null);
  const { setMessage } = useContext(AppContext);
  const navigate = useNavigate();
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
        setMessage({
          title: "Detalle Vacaciones",
          show: true,
          OkTitle: "Aceptar",
          description: (
            <div className="container-modal_description">"hola"</div>
          ),
          size: "large",
          background: true,
        });
      },
    },
  ];

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const onSubmit = handleSubmit(async (data: ILicenceFilters) => {
    console.log(data)
    loadTableData(data);
  });

  return {onSubmit,tableActions,tableColumns,navigate,tableComponentRef,reset,control,errors};
}
