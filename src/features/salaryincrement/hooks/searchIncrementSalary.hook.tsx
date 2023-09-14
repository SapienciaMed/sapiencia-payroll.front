import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { DateTime } from "luxon";

import { filterIncrementSalarySchema } from "../../../common/schemas";

import { formaterNumberToCurrency } from "../../../common/utils/helpers";

import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  ISalaryHistory,
  ISalaryIncrementFilter,
} from "../../../common/interfaces/payroll.interfaces";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";

import { TextAreaComponent } from "../../../common/components/Form";
import {
  DataItem,
  ResponsiveTable,
} from "../../../common/components/Form/table-detail.component";

import { AppContext } from "../../../common/contexts/app.context";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";

export default function useSearchIncrementSalaryHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getCharges } = usePayrollService();

  //states
  const [showTable, setshowTable] = useState(false);
  const [charges, setCharges] = useState<IDropdownProps[]>([]);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState, reset, watch } =
    useForm<ISalaryIncrementFilter>({
      //resolver,
      mode: "all",
      defaultValues: {
        numberActApproval: "",
        codCharge: null,
      },
    });

  const formValues = watch();

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

  const showDetailIncrementSalary = (row: ISalaryHistory) => {
    if (row) {
      console.log(row);

      const infoPersonalIncrement: DataItem[] = [
        {
          title: <span className="text-left">Número de documento</span>,
          value: row.employment?.worker.numberDocument,
        },
        {
          title: <span className="text-left">Nombre empleado</span>,
          value: `${row.employment?.worker?.firstName} ${
            row.employment?.worker?.secondName
          }${" "}
          ${row.employment?.worker?.surname}${" "}
          ${row.employment?.worker?.secondSurname}`,
        },
        {
          title: <span className="text-left">Cargo</span>,
          value: row.salaryIncrement?.charge.name,
        },
        {
          title: (
            <span className="text-left">Número de acta de aprobación</span>
          ),
          value: row.salaryIncrement?.numberActApproval,
        },
      ];

      const detailIncrement: DataItem[] = [
        {
          title: "Salario anterior",
          value: String(
            formaterNumberToCurrency(row.salaryIncrement?.previousSalary)
          ),
        },
        {
          title: "Salario actual",
          value: String(
            formaterNumberToCurrency(row.salaryIncrement?.newSalary)
          ),
        },
        {
          title: "Fecha efectiva",
          value: DateTime.fromISO(row?.effectiveDate)
            .setZone("America/Bogota")
            .toLocaleString(DateTime.DATETIME_FULL),
        },
      ];

      return setMessage({
        title: "Detalle del incremento",
        show: true,
        OkTitle: "Aceptar",
        description: (
          <div className="container-modal_description">
            <ResponsiveTable data={infoPersonalIncrement} />
            <div>
              <h3 className="text-left  padding-left_16">
                Detalle del incremento
              </h3>
              <ResponsiveTable data={detailIncrement} />
            </div>
            <TextAreaComponent
              label={"Observaciones"}
              idInput=""
              value={`${row.salaryIncrement?.observation}`}
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

  const onSubmit = handleSubmit(async (data: ISalaryIncrementFilter) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  //variables
  const tableColumns: ITableElement<ISalaryHistory>[] = [
    {
      fieldName: "employment.worker.numberDocument",
      header: "Número de documento",
      renderCell: (row) => {
        return <>{row.employment?.worker?.numberDocument}</>;
      },
    },
    {
      fieldName: "row.employment.worker",
      header: "Nombre completo",
      renderCell: (row) => {
        return (
          <>
            {row.employment?.worker.firstName}{" "}
            {row.employment?.worker.secondName} {row.employment?.worker.surname}{" "}
            {row.employment?.worker.secondSurname}
          </>
        );
      },
    },
    {
      fieldName: "salaryIncrement.charge.name",
      header: "Cargo",
      renderCell: (row) => {
        return <>{row.salaryIncrement?.charge.name}</>;
      },
    },
    {
      fieldName: "salaryIncrement.numberActApproval",
      header: "Número de acta de aprobación",
      renderCell: (row) => {
        return <>{row.salaryIncrement?.numberActApproval}</>;
      },
    },
  ];

  const tableActions: ITableAction<ISalaryHistory>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        showDetailIncrementSalary(row);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row.salaryIncrement.id}`);
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
    formValues,
    showTable,
    charges,
    tableComponentRef,
    tableColumns,
    tableActions,
  };
}
