import { useContext, useRef, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { RiFileExcel2Line } from "react-icons/ri";
import { BsCheckCircle } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
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

  const { generatePayroll, downloadPayroll, authorizePayroll } =
    usePayrollGenerate();

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

  const handleModalLoad = (typeSpreadSheet: string, authorize?: boolean) => {
    setMessage({
      title: `${authorize ? "Autorizar" : "Generar"} planilla`,
      description: (
        <div className="container-modal_load">
          <h3>{`${
            authorize ? "autorizando" : "Generando"
          } ${typeSpreadSheet}`}</h3>
          <ProgressBar
            mode="indeterminate"
            style={{ height: "6px" }}
          ></ProgressBar>
        </div>
      ),
      show: true,
      size: "medium",
      OkTitle: `${authorize ? "Autorizando..." : "Generando..."}`,
      onOk: () => {
        return false;
      },
      onClose: () => {
        return false;
      },
    });
  };

  const handleModalSuccess = (
    data: any,
    typeSpreadSheet: string,
    authorize?: boolean
  ) => {
    setMessage({
      title: `${authorize ? "Autorizar" : "Generar"} planilla`,
      description: `Se ha ${
        authorize ? "autorizado" : "generado"
      } planilla ${typeSpreadSheet} con éxito`,
      // description: <div>{JSON.stringify(data)}</div>,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        reset();
        tableComponentRef.current?.emptyData();
        setshowTable(false);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      // size: "extra-large",
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
          title: `Autorizar planilla`,
          description: `¿Estás segur@ de autorizar la
          planilla ${row.formsType[0].name}?`,
          show: true,
          OkTitle: "Aceptar",
          onOk: () => {
            if (row.state == "Pendiente") {
              setMessage({
                title: `Autorizar planilla`,
                description: `La planilla ${row.formsType[0].name} que deseas autorizar no se ha generado aún`,
                show: true,
                OkTitle: "Aceptar",
                background: true,
              });
            } else {
              handleModalLoad(row.formsType[0].name, true);

              authorizePayroll(row.id)
                .then(({ data, operation }) => {
                  if (operation.code === EResponseCodes.OK) {
                    handleModalSuccess(data, row.formsType[0].name, true);
                  }
                })
                .catch((err) => {
                  handleModalError("Error en la autorización de planilla");
                  console.log("algo fallo", err);
                });
            }
          },
          cancelTitle: "Cancelar",
          background: true,
        });
      },
      customIcon: () => {
        return (
          <BsCheckCircle
            color="#0cae2a"
            className="autorizar"
            data-pr-tooltip="Autorizar"
          />
        );
      },
      hide: !validateActionAccess("PLANILLA_APROBAR"),
      tooltipClass: "autorizar",
    },
    {
      onClick: (row) => {
        setMessage({
          title: `Generar planilla`,
          description: `¿Estás segur@ de generar
          planilla ${row.formsType[0].name}?`,
          show: true,
          OkTitle: "Aceptar",
          onOk: () => {
            if (row.state == "Autorizada") {
              setMessage({
                title: `Generar planilla`,
                description: `La planilla ${row.formsType[0].name} que deseas generar ya se encuentra autorizada`,
                show: true,
                OkTitle: "Aceptar",
                background: true,
              });
            } else {
              handleModalLoad(row.formsType[0].name);

              generatePayroll(row.id)
                .then(({ data, operation }) => {
                  if (operation.code === EResponseCodes.OK) {
                    handleModalSuccess(data, row.formsType[0].name);
                  } else {
                    handleModalError("Error en la generación de planilla");
                  }
                })
                .catch((err) => {
                  handleModalError("Error en la generación de planilla");
                  console.log("algo fallo", err);
                });
            }
          },
          cancelTitle: "Cancelar",
          background: true,
        });
      },
      customIcon: () => {
        return (
          <FaGear
            color="#0cae2a"
            className="generate"
            data-pr-tooltip="Generar"
          />
        );
      },
      hide: !validateActionAccess("PLANILLA_GENERAR"),
      tooltipClass: "generate",
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
        if (row.state == "Autorizada") {
          setMessage({
            title: `Generar planilla`,
            description: `La planilla ${row.formsType[0].name} que deseas editar ya se encuentra autorizada`,
            show: true,
            OkTitle: "Aceptar",
            background: true,
          });
        } else {
          navigate(`../edit/${row.id}`);
        }
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
        return (
          <RiFileExcel2Line
            color="#21A366"
            className="xlsxDownload"
            data-pr-tooltip="Exportar a excel"
          />
        );
      },
      tooltipClass: "xlsxDownload",
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
