import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ISalaryHistory } from "../../../common/interfaces/payroll.interfaces";
import { ITableAction } from "../../../common/interfaces/table.interfaces";

import { filterSuspensionContractSchema } from "../../../common/schemas";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useListData from "../../vacation/hooks/list.hook";

const useSearchSuspensionContract = () => {
  //states
  const [showTable, setShowTable] = useState<boolean>(false);

  //refs
  const tableComponentRef = useRef(null);

  //custom hooks
  const { activeWorkerList } = useListData();

  // react router dom
  const navigate = useNavigate();

  //use form
  const resolver = useYupValidationResolver(filterSuspensionContractSchema);
  const { handleSubmit, control, formState, reset } = useForm({ resolver });

  //functions
  const onSubmitSearchSuspensionContract = handleSubmit(async (data) => {
    setShowTable(true);
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  const showDetailSuspensionContract = (row) => {
    console.log(row);
  };
  const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setShowTable(false);
  };

  const redirectCreate = () => {
    navigate("../crear");
  };

  //variables
  // const tableColumns: ITableElement<any>[] = [
  const tableColumns = [
    {
      fieldName: "",
      header: "Número de documento",
      renderCell: (row) => {
        return <>1234</>;
      },
    },
    {
      fieldName: "",
      header: "Nombres",
      renderCell: (row) => {
        return <>Jhon</>;
      },
    },
    {
      fieldName: "",
      header: "Apellidos",
      renderCell: (row) => {
        return <>Doe</>;
      },
    },
    {
      fieldName: "",
      header: "Tipo contrato",
      renderCell: (row) => {
        return <>Contratista</>;
      },
    },
    {
      fieldName: "",
      header: "Estado",
      renderCell: (row) => {
        return <>Activo</>;
      },
    },
  ];

  // const tableActions: ITableAction<ISalaryHistory>[] = [
  const tableActions: ITableAction<ISalaryHistory>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        showDetailSuspensionContract(row);
      },
    },
  ];

  return {
    control,
    formState,
    onSubmitSearchSuspensionContract,
    clearFields,
    redirectCreate,
    tableComponentRef,
    activeWorkerList,
    showTable,
    tableColumns,
    tableActions,
  };
};

export default useSearchSuspensionContract;
