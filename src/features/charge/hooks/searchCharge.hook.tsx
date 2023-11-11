import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  ICharge,
  IChargeFilters,
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

export default function useSearchChargeHook() {
  // Context
  const { setMessage, validateActionAccess } = useContext(AppContext);

  //custom hooks
  // const { getCharges } = usePayrollService();

  //states
  const [showTable, setshowTable] = useState(false);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState, reset, watch } =
    useForm<IChargeFilters>({
      //resolver,
      mode: "all",
      defaultValues: {
        id: null,
      },
    });

  const formValues = watch();

  //variables

  // carga combos
  // useEffect(() => {
  //   loadDropdown();
  // }, []);

  //functions
  // const loadDropdown = async () => {
  //   //charges
  //   const { data, operation } = await getCharges();
  //   if (operation.code === EResponseCodes.OK) {
  //     const chargesList = data.map((item) => {
  //       return {
  //         name: item.name,
  //         value: item.id,
  //       };
  //     });

  //     setCharges(chargesList);
  //   } else {
  //     setCharges([]);
  //   }
  // };

  const redirectCreate = () => {
    navigate("../crear");
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
  const tableColumns: ITableElement<ICharge>[] = [
    {
      fieldName: "name",
      header: "Tipo cargo",
      renderCell: (row) => {
        return <>{row.name}</>;
      },
    },
    {
      fieldName: "name",
      header: "Cargo / Perfil",
      renderCell: (row) => {
        return <>{row.name}</>;
      },
    },
    {
      fieldName: "baseSalary",
      header: "Ingreso base mensual",
      renderCell: (row) => {
        return <>{formaterNumberToCurrency(row.baseSalary)}</>;
      },
    },
    {
      fieldName: "state",
      header: "Estado",
      renderCell: (row) => {
        return <>{row.state ? "Activo" : "No activo"}</>;
      },
    },
    {
      fieldName: "observation",
      header: "Observaciones",
      renderCell: (row) => {
        return <>{row?.observations}</>;
      },
    },
  ];

  const tableActions: ITableAction<IManualDeduction>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row?.id}`);
      },
      hide: !validateActionAccess("EDITAR_CARGOS"),
    },
  ];

  return {
    register,
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
    validateActionAccess,
    setMessage,
  };
}
