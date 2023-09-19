import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IFormPeriod,
  IFormPeriodFilters,
} from "../../../common/interfaces/payroll.interfaces";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { useNavigate } from "react-router-dom";
import useListData from "../../vacation/hooks/list.hook";

export default function useSearchSpreadSheetHook() {
  // Context

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
    const dataModified = {
      ...data,
      paidDate: new Date(String(data.paidDate)).toDateString(),
    };
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(dataModified);
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
        return <>{row.dateStart}</>;
      },
    },
    {
      fieldName: "dateEnd",
      header: "Fecha fin",
      renderCell: (row) => {
        return <>{row.dateEnd}</>;
      },
    },
    {
      fieldName: "paidDate",
      header: "Fecha pago",
      renderCell: (row) => {
        return <>{row.paidDate}</>;
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
