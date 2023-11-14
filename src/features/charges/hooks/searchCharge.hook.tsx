import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ICharge,
  IChargeFilters,
  ITypesCharges,
} from "../../../common/interfaces/payroll.interfaces";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import { EResponseCodes } from "../../../common/constants/api.enum";
import useChargesService from "../../../common/hooks/charges-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";

export default function useSearchSpreadSheetHook() {
  // Context
  const { setMessage, validateActionAccess } = useContext(AppContext);

  //custom hooks
  const { getTypesChargeList } = useChargesService();
  //states
  const [showTable, setshowTable] = useState(false);
  const [typesChargesList, setTypesChargesList] = useState([]);
  useEffect(() => {
    getTypesChargeList().then((response: ApiResponse<ITypesCharges[]>) => {
      if (response && response?.operation?.code === EResponseCodes.OK) {
        setTypesChargesList(
          response.data.map((item) => {
            return { name: item.name, value: item.id };
          })
        );
      }
    });
  }, []);
  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  //react-hook-fom
  const { formState, control, handleSubmit, reset, watch, register } =
    useForm<IChargeFilters>({
      defaultValues: { name: "", codChargeType: null },
      mode: "all",
    });

  const formValues = watch();

  //functions
  const redirectCreate = () => {
    if (validateActionAccess("CREAR_CARGOS")) {
      navigate("../crear");
    } else {
      setMessage({
        title: "Crear Cargo",
        show: true,
        OkTitle: "Aceptar",
        description: "No tienes permisos para esta acción",
        size: "large",
        background: true,
      });
    }
  };

  const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setshowTable(false);
  };

  const onSubmit = handleSubmit((data: IChargeFilters) => {
    const dataModified = {
      ...data,
    };
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(dataModified);
    }
  });

  //variables
  const tableColumns: ITableElement<ICharge>[] = [
    {
      fieldName: "typeCharge.name",
      header: "Tipo Cargo",
      renderCell: (row) => {
        return <>{row.typeCharge.name}</>;
      },
    },
    {
      fieldName: "name",
      header: "Cargo/Perfil",
      renderCell: (row) => {
        return <>{row.name}</>;
      },
    },
    {
      fieldName: "baseSalary",
      header: "Salario Base",
      renderCell: (row) => {
        return <>{formaterNumberToCurrency(row.baseSalary)}</>;
      },
    },
    {
      fieldName: "state",
      header: "Estado",
      renderCell: (row) => {
        return <>{row.state ? "Activo" : "Inactivo"}</>;
      },
    },
    {
      fieldName: "observations",
      header: "Observaciones",
      renderCell: (row) => {
        return <>{row.observations}</>;
      },
    },
  ];

  const tableActions: ITableAction<ICharge>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row.id}`);
      },
      hide: !validateActionAccess("EDITAR_CARGOS"),
    },
  ];

  return {
    formState,
    control,
    showTable,
    formValues,
    tableComponentRef,
    typesChargesList,
    tableColumns,
    tableActions,
    redirectCreate,
    onSubmit,
    clearFields,
    register,
  };
}
