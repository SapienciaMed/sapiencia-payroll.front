import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IDeductionsFilter,
  IManualDeduction,
} from "../../../common/interfaces/payroll.interfaces";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";

import useListData from "../../vacation/hooks/list.hook";

import { TextAreaComponent } from "../../../common/components/Form";
import {
  DataItem,
  ResponsiveTable,
} from "../../../common/components/Form/table-detail.component";

import { AppContext } from "../../../common/contexts/app.context";

import usePayrollService from "../../../common/hooks/payroll-service.hook";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";
import usePayrollGenerate from "../../../common/hooks/payroll-generate.hook";

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
    useForm<IDeductionsFilter>({
      //resolver,
      mode: "all",
      defaultValues: {
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
    reset();
    tableComponentRef.current?.emptyData();
    setshowTable(false);
  };

  const showDetailDeductions = (row: IManualDeduction) => {};

  const onSubmit = handleSubmit(async (data: IDeductionsFilter) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  //variables
  const tableColumns: ITableElement<IManualDeduction>[] = [];

  const tableActions: ITableAction<IManualDeduction>[] = [];

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
