import { useState, useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";

import {
  IDeductionsFilter,
  IFilterOtherIncome,
  IGetOtherIncome,
} from "../../../common/interfaces/payroll.interfaces";

import useListData from "../../vacation/hooks/list.hook";

import { AppContext } from "../../../common/contexts/app.context";

import { formaterNumberToCurrency } from "../../../common/utils/helpers";

export default function useSearchOtherIncomeHook() {
  // Context
  const { setMessage, validateActionAccess } = useContext(AppContext);

  //custom hooks
  const { activeWorkerList, periodsList } = useListData();

  //states
  const [showTable, setshowTable] = useState(false);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState, reset, watch } =
    useForm<IFilterOtherIncome>({
      //resolver,
      mode: "all",
      defaultValues: {
        codPayroll: null,
        codEmployment: null,
      },
    });

  const formValues = watch();

  // carga combos

  //functions
  const redirectCreate = () => {
    if (validateActionAccess("CREAR_OTROS_INGRESOS")) {
      navigate("../crear");
    } else {
      setMessage({
        title: "Crear otros ingresos.",
        show: true,
        OkTitle: "Aceptar",
        description: "No tienes permisos para esta acción.",
        background: true,
      });
    }
  };

  const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setshowTable(false);
  };

  const onSubmit = handleSubmit(async (data: IDeductionsFilter) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  //variables
  const tableColumns: ITableElement<IGetOtherIncome>[] = [
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
      header: "Tipo de ingreso",
      renderCell: (row) => {
        return <>{row.incomeType.name}</>;
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

  const tableActions: ITableAction<IGetOtherIncome>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row?.id}`);
      },
      hide: !validateActionAccess("EDITAR_OTROS_INGRESOS"),
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
