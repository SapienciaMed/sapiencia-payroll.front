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

export default function useSearchDeductionsHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getCharges } = usePayrollService();
  const { activeWorkerList, periodsList } = useListData();

  //states
  const [showTable, setshowTable] = useState(false);
  const [charges, setCharges] = useState<IDropdownProps[]>([]);

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

  //variables
  const typeDeductionList = [
    {
      name: "Eventuales",
      value: "Eventual",
    },
    {
      name: "Cíclicas",
      value: "Ciclica",
    },
  ];

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

  const showDetailDeductions = (row: IManualDeduction) => {
    if (row) {
      const infoPersonalIncrement: DataItem[] = [
        {
          title: <span className="text-left">No. documento</span>,
          value: row.employment.worker.numberDocument,
        },
        {
          title: <span className="text-left">Nombre y apellido</span>,
          value: `${row.employment.worker.firstName} ${
            row.employment.worker.secondName
          }${" "}
          ${row.employment.worker.surname}${" "}
          ${row.employment.worker.secondSurname}`,
        },
        {
          title: <span className="text-left">Tipo de deducción</span>,
          value: row.deductionsType[0].type,
        },
        {
          title: <span className="text-left">Nombre de deducción</span>,
          value: row.deductionsType[0].name,
        },
        {
          title: <span className="text-left">Estado</span>,
          value: row.state,
        },
        {
          title: <span className="text-left">Periodo de planilla</span>,
          value: "",
        },
      ];

      return setMessage({
        title: "Detalle de deducción",
        show: true,
        OkTitle: "Aceptar",
        description: (
          <div className="container-modal_description">
            <ResponsiveTable data={infoPersonalIncrement} />
            <div>
              <h3 className="text-left  padding-left_16">Detalle</h3>
            </div>
            <TextAreaComponent
              label={"Observaciones"}
              idInput=""
              value={`${row.observation}`}
              disabled={true}
              className="text-area-basic"
              classNameLabel="text-black big bold"
              rows={5}
            />
          </div>
        ),
        size: "large",
        background: true,
      });
    } else {
      return;
    }
  };

  const onSubmit = handleSubmit(async (data: IDeductionsFilter) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  //variables
  const tableColumns: ITableElement<IManualDeduction>[] = [
    {
      fieldName: "employment.worker.numberDocument",
      header: "No. documento",
      renderCell: (row) => {
        return <>{row.employment.worker.numberDocument}</>;
      },
    },
    {
      fieldName: "row.employment.worker",
      header: "Nombre y apellido",
      renderCell: (row) => {
        return (
          <>
            {row.employment.worker.firstName} {row.employment.worker.secondName}{" "}
            {row.employment.worker.surname}{" "}
            {row.employment.worker.secondSurname}
          </>
        );
      },
    },
    {
      fieldName: "row.deductionsType.name",
      header: "Tipo de deducción",
      renderCell: (row) => {
        return <>{row.deductionsType[0].type}</>;
      },
    },
    {
      fieldName: "deductions.numberActApproval",
      header: "Nombre de deducción",
      renderCell: (row) => {
        return <>{row.deductionsType[0].name}</>;
      },
    },
    {
      fieldName: "deductions.numberActApproval",
      header: "Estado",
      renderCell: (row) => {
        return <>{row.state}</>;
      },
    },
    {
      fieldName: "deductions.numberActApproval",
      header: "Periodo de planilla",
      renderCell: (row) => {
        return <>{`${row.formsPeriod.dateStart}-${row.formsPeriod.dateEnd}`}</>;
      },
    },
  ];

  const tableActions: ITableAction<IManualDeduction>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        showDetailDeductions(row);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row?.id}`);
      },
    },
  ];

  return {
    register,
    typeDeductionList,
    periodsList,
    activeWorkerList,
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    formValues,
    showTable,
    charges,
    tableComponentRef,
    tableColumns,
    tableActions,
  };
}
