import { useContext, useRef, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { RiFileExcel2Line } from "react-icons/ri";
import { BsCheckCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import {
  IFormPeriod,
  IFormPeriodFilters,
} from "../../../common/interfaces/payroll.interfaces";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";

import { useNavigate } from "react-router-dom";
import useListData from "../../vacation/hooks/list.hook";
import usePayrollGenerate from "../../../common/hooks/payroll-generate.hook";
import { AppContext } from "../../../common/contexts/app.context";
import { EResponseCodes } from "../../../common/constants/api.enum";

export default function useSearchSpreadSheetHook() {
  // Context
  const { setMessage, validateActionAccess } = useContext(AppContext);

  const { generatePayroll, downloadPayroll } = usePayrollGenerate();

  //custom hooks
  const { typesSpreadSheetList, stateSpreadSheetList } = useListData();
  //states
  const [showTable, setshowTable] = useState(false);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  //react-hook-fom
  const { formState, control, handleSubmit, reset, watch } =
    useForm<IFormPeriodFilters>({
      defaultValues: { idFormType: null, paidDate: null, state: null },
      mode: "all",
    });

  const formValues = watch();

  //functions
  const redirectCreate = () => {
    if (validateActionAccess("PLANILLA_CREAR")) {
      navigate("../crear");
    } else {
      setMessage({
        title: "Crear Planilla",
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

  const onSubmit = handleSubmit((data: IFormPeriodFilters) => {
    const dataModified = {
      ...data,
      paidDate: data.paidDate
        ? new Date(String(data.paidDate)).toDateString()
        : null,
    };
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(dataModified);
    }
  });

  const showDetailSpreadSheet = (data: IFormPeriod) => {
    // handleModalLoad();
  };

  const handleModalLoad = () => {
    setMessage({
      title: `Generar planilla`,
      description: (
        <div className="container-modal_load">
          <h3>Generando planilla quincenal</h3>
          <ProgressBar
            mode="indeterminate"
            style={{ height: "6px" }}
          ></ProgressBar>
        </div>
      ),
      show: true,
      size: "small",
      OkTitle: "Generando...",
      onOk: () => {
        return false;
      },
      onClose: () => {
        return false;
      },
    });
  };

  const handleModalSuccess = (data: any) => {
    setMessage({
      title: `Generar planilla`,
      description: <div>{JSON.stringify(data)}</div>,
      show: true,
      OkTitle: "Aceptar",
      size: "extra-large",
    });
  };

  const handleModalError = (msg: string = "Error, algo fallo") => {
    setMessage({
      title: "Error",
      description: msg,
      show: true,
      OkTitle: "cerrar",
      onOk: () => {
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        setMessage({});
      },
      background: true,
    });
  };

  //variables
  const tableColumns: ITableElement<IFormPeriod>[] = [
    {
      fieldName: "formsType.name",
      header: "Tipo planilla",
      renderCell: (row) => {
        return <>{row.formsType[0].name}</>;
      },
    },
    {
      fieldName: "dateStart",
      header: "Fecha inicio",
      renderCell: (row) => {
        return <>{row.dateStart}</>;
      },
    },
    {
      fieldName: "dateEnd",
      header: "Fecha fin",
      renderCell: (row) => {
        return <>{row.dateEnd}</>;
      },
    },
    {
      fieldName: "paidDate",
      header: "Fecha pago",
      renderCell: (row) => {
        return <>{row.paidDate}</>;
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

  const tableActions: ITableAction<IFormPeriod>[] = [
    {
      onClick: (row) => {
        setMessage({
          title: `Generar planilla`,
          description: `¿Estás segur@ de generar
          planilla ${row.formsType[0].name}?`,
          show: true,
          OkTitle: "Aceptar",
          onOk: () => {
            handleModalLoad();

            generatePayroll(row.id)
              .then(({ data, operation }) => {
                if (operation.code === EResponseCodes.OK) {
                  handleModalSuccess(data);
                }
              })
              .catch((err) => {
                handleModalError("Error en la generación de planilla");
                console.log("algo fallo", err);
              });
          },
          cancelTitle: "Cancelar",
          background: true,
        });
      },
      customIcon: () => {
        return <BsCheckCircle color="#0cae2a" />;
      },
      hide:!validateActionAccess('PLANILLA_GENERAR')
    },
    // {
    //   icon: "Detail",
    //   onClick: (row) => {
    //     showDetailSpreadSheet(row);
    //   },
    //   hide: !validateActionAccess("PLANILLA_CONSULTAR"),
    // },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row.id}`);
      },
      hide: !validateActionAccess("PLANILLA_EDITAR"),
    },
    {
      onClick: (row) => {
        downloadPayroll(row.id)
          .then(({ data, operation }) => {
            if (operation.code === EResponseCodes.OK) {
              const buffer = new Uint8Array(data.data); // Convierte el Array del búfer en Uint8Array
              const blob = new Blob([buffer]);
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${row.formsType[0].name}.xlsx`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              setMessage({
                title: `Descargar excel`,
                description: `El archivo fue descargado con éxito`,
                show: true,
                OkTitle: "Aceptar",
                background: true,
              });
            } else {
              setMessage({
                title: `Descargar excel`,
                description: `El archivo no pudo ser descargado : ${operation.message}`,
                show: true,
                OkTitle: "Aceptar",
                background: true,
              });
            }
          })
          .catch((err) => {
            setMessage({
              title: `Descargar excel`,
              description: `El archivo no pudo ser descargado`,
              show: true,
              OkTitle: "Aceptar",
              background: true,
            });
            console.log("algo fallo", err);
          });
      },
      customIcon: () => {
        return <RiFileExcel2Line color="#21A366" />;
      },
      hide: !validateActionAccess("PLANILLA_DESCARGAR"),
    },
  ];

  return {
    formState,
    control,
    showTable,
    formValues,
    tableComponentRef,
    typesSpreadSheetList,
    stateSpreadSheetList,
    tableColumns,
    tableActions,
    redirectCreate,
    onSubmit,
    clearFields,
  };
}
