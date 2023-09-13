import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { DateTime } from "luxon";

import {
  IFormPeriod,
  IFormPeriodFilters,
} from "../../../common/interfaces/payroll.interfaces";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";

import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";

import useListData from "../../vacation/hooks/list.hook";

export default function useSearchSpreadSheetHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { typesSpreadSheetList, stateSpreadSheetList } = useListData();
  //states
  const [showTable, setshowTable] = useState(false);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  //react-hook-fom
  const { formState, control, handleSubmit, reset, watch } =
    useForm<IFormPeriodFilters>({
      defaultValues: { idFormType: null, paidDate: null, state: null },
      mode: "all",
    });

  const formValues = watch();

  //functions
  const redirectCreate = () => {
    navigate("../crear");
  };

  const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setshowTable(false);
  };

  const onSubmit = handleSubmit((data: IFormPeriodFilters) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  const showDetailSpreadSheet = (data: IFormPeriod) => {};

  //variables
  const tableColumns: ITableElement<IFormPeriod>[] = [
    {
      fieldName: "formsType.name",
      header: "Tipo planilla",
      renderCell: (row) => {
        return <>{row.formsType[0].name}</>;
      },
    },
    {
      fieldName: "dateStart",
      header: "Fecha inicio",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row.dateStart).toLocaleString()}</>;
      },
    },
    {
      fieldName: "dateEnd",
      header: "Fecha finn",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row.dateEnd).toLocaleString()}</>;
      },
    },
    {
      fieldName: "paidDate",
      header: "Fecha pago",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row.paidDate).toLocaleString()}</>;
      },
    },
    {
      fieldName: "state",
      header: "Estado",
      renderCell: (row) => {
        return <>{row.state}</>;
      },
    },
  ];

  const tableActions: ITableAction<IFormPeriod>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        showDetailSpreadSheet(row);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row.id}`);
      },
    },
  ];

  return {
    formState,
    control,
    showTable,
    formValues,
    tableComponentRef,
    typesSpreadSheetList,
    stateSpreadSheetList,
    tableColumns,
    tableActions,
    redirectCreate,
    onSubmit,
    clearFields,
  };
}
