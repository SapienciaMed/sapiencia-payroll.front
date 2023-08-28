import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { filterIncrementSalarySchema } from "../../../common/schemas";

import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";

import { EResponseCodes } from "../../../common/constants/api.enum";

import { IDropdownProps } from "../../../common/interfaces/select.interface";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";

export default function useSearchIncrementSalaryHook() {
  //custom hooks
  const { getCharges } = usePayrollService();

  //states
  const [showTable, setshowTable] = useState(false);
  const [charges, setCharges] = useState<IDropdownProps[]>([]);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  //useForm
  const resolver = useYupValidationResolver(filterIncrementSalarySchema);

  const { register, handleSubmit, control, formState, reset } = useForm({
    resolver,
    mode: "all",
    defaultValues: {
      numActaAprobacion: "",
      idCharge: "",
    },
  });

  // carga combos
  useEffect(() => {
    loadDropdown();
  }, []);

  //functions
  const loadDropdown = async () => {
    //charges
    const { data, operation } = await getCharges();
    if (operation.code === EResponseCodes.OK) {
      const chargesList = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });

      setCharges(chargesList);
    } else {
      setCharges([]);
    }
  };

  const redirectCreate = () => {
    navigate("../crear");
  };

  const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setshowTable(false);
  };

  const showDetailIncrementSalary = (id?: number) => {
    alert("Detalle");
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setshowTable(true);
  });

  //variables
  const tableColumns: ITableElement<any>[] = [
    {
      fieldName: "",
      header: "Número de documento",
      renderCell: (row) => {
        return <>35434545</>;
      },
    },
    {
      fieldName: "",
      header: "Nombre completo",
      renderCell: (row) => {
        return <>Jhon Doe</>;
      },
    },
    {
      fieldName: "",
      header: "Cargo",
      renderCell: (row) => {
        return <>Profesional universitario</>;
      },
    },
    {
      fieldName: "",
      header: "Número de acta de aprobación",
      renderCell: (row) => {
        return <>28 DE 26 DE ENERO DE 2023</>;
      },
    },
  ];

  const tableActions: ITableAction<any>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        showDetailIncrementSalary(1);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/1`);
      },
    },
  ];

  return {
    register,
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    showTable,
    charges,
    tableComponentRef,
    tableColumns,
    tableActions,
  };
}
