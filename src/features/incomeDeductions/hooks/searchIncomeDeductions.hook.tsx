import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IDeductionsFilter,
  IFilterTaxDeductible,
  IGetTaxDeductible,
  IManualDeduction,
} from "../../../common/interfaces/payroll.interfaces";

import useListData from "../../vacation/hooks/list.hook";

import { AppContext } from "../../../common/contexts/app.context";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";

export default function useSearchIncomeDeductionsHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { activeWorkerList, periodsList } = useListData();

  //states
  const [showTable, setshowTable] = useState(false);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState, reset, watch } =
    useForm<IFilterTaxDeductible>({
      //resolver,
      mode: "all",
      defaultValues: {
        year: "",
        codEmployment: null,
      },
    });

  const formValues = watch();

  // carga combos

  //functions
  const redirectCreate = () => {
    navigate("../crear");
  };

  const clearFields = () => {
    setshowTable(false);
    reset();
    tableComponentRef.current?.emptyData();
  };

  const onSubmit = handleSubmit(async (data: IFilterTaxDeductible) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  //variables
  const tableColumns: ITableElement<IGetTaxDeductible>[] = [
    {
      fieldName: "employment.worker.numberDocument",
      header: "No. documento",
      renderCell: (row) => {
        return <>{row.employment.worker.numberDocument}</>;
      },
    },
    {
      fieldName: "employment.worker",
      header: "Nombre completo",
      renderCell: (row) => {
        return (
          <>{`${row.employment.worker.firstName} ${row.employment.worker.secondName} ${row.employment.worker.surname} ${row.employment.worker.secondSurname}`}</>
        );
      },
    },
    {
      fieldName: "type",
      header: "Tipo de deduccion",
      renderCell: (row) => {
        return <>{row.type}</>;
      },
    },
    {
      fieldName: "value",
      header: "Valor total",
      renderCell: (row) => {
        return <>{formaterNumberToCurrency(row.value)}</>;
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

  const tableActions: ITableAction<IGetTaxDeductible>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row?.id}`);
      },
      // hide:  !validateActionAccess("DEDUCCION_EDITAR")
    },
  ];

  return {
    register,
    periodsList,
    activeWorkerList,
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    formValues,
    showTable,
    tableComponentRef,
    tableColumns,
    tableActions,
  };
}
