import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IFilterTaxDeductible,
  IGetTaxDeductible,
} from "../../../common/interfaces/payroll.interfaces";

import useListData from "../../vacation/hooks/list.hook";

import { AppContext } from "../../../common/contexts/app.context";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";

export default function useSearchIncomeDeductionsHook() {
  // Context
  const { setMessage, validateActionAccess } = useContext(AppContext);

  //custom hooks
  const { activeWorkerList, periodsList } = useListData();
  const { getListByGroupers } = useGenericListService();

  //states
  const [showTable, setshowTable] = useState(false);

  const [typeTaxDeduction, setTypeTaxDeduction] = useState<IDropdownProps[]>(
    []
  );

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

  useEffect(() => {
    loadInitList();
  }, []);

  //functions

  const loadInitList = async (): Promise<void> => {
    const groupers = ["TIPO_DEDUCCION_RENTA"];

    const { data, operation } = await getListByGroupers(groupers);

    if (EResponseCodes.OK === operation.code) {
      const optionsTypeTaxDeductions = data.map((item) => {
        return {
          name: item.itemDescription,
          value: item.itemCode,
        } as IDropdownProps;
      });

      setTypeTaxDeduction(optionsTypeTaxDeductions);
    } else {
      setTypeTaxDeduction([]);
    }
  };

  const redirectCreate = (): void => {
    if (validateActionAccess("CREAR_DEDUCCION_RENTA")) {
      navigate("../crear");
    } else {
      setMessage({
        title: "Crear deducciones de renta",
        show: true,
        OkTitle: "Aceptar",
        description: "No tienes permisos para esta acción.",
        background: true,
      });
    }
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
      header: "Tipo de deducción",
      renderCell: (row) => {
        const valueSelected = typeTaxDeduction.find(
          (i) => i.value === row.type
        );

        return <>{valueSelected.name}</>;
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
      hide: !validateActionAccess("EDITAR_DEDUCCION_RENTA"),
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
    validateActionAccess,
    formValues,
    showTable,
    tableComponentRef,
    tableColumns,
    tableActions,
  };
}
