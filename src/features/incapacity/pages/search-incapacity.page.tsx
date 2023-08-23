import React, { useRef, useState } from "react";
import TableComponent from "../../../common/components/table.component";
import { useForm } from "react-hook-form";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../common/components/Form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IFilterIncapacity,
  IGetIncapacity,
  IGetVinculation,
} from "../../../common/interfaces/payroll.interfaces";
import { useNavigate } from "react-router-dom";
import useListData from "../../vacation/hooks/list.hook";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useViewIncapacityDetail from "../hooks/viewIncapacity.hook";

const SearchIncapacity = () => {
  const { activeWorkerList } = useListData();

  const { showDetailIncapacity } = useViewIncapacityDetail();

  const tableComponentRef = useRef(null);

  const navigate = useNavigate();

  const [showTable, setshowTable] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<IFilterIncapacity>({ defaultValues: { workerId: "" } });

  const workerId = watch("workerId")
  const tableColumns: ITableElement<IGetIncapacity>[] = [
    {
      fieldName: "numberDocument",
      header: "Numero de documento",
      renderCell: (row) => {
        return <>{row.employment.worker.numberDocument}</>;
      },
    },
    {
      fieldName: "firstName",
      header: "Nombres completo",
      renderCell: (row) => {
        return (
          <>
            {`${row.employment.worker?.firstName}
               ${row.employment.worker?.secondName} 
               ${row.employment.worker?.surname}
               ${row.employment.worker?.secondSurname}`}
          </>
        );
      },
    },
    {
      fieldName: "employment.typeIncapacity",
      header: "Origen incapacidad",
      renderCell: (row) => {
        return <>{row.typeIncapacity?.name}</>;
      },
    },
  ];

  const tableActions: ITableAction<IGetVinculation>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        showDetailIncapacity(row?.id);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${row?.id}`);
      },
    },
  ];

  function loadTableData(filterVinculation: IFilterIncapacity): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(filterVinculation);
    }
  }

  const onSubmit = handleSubmit(async (data: IFilterIncapacity) => {
    setshowTable(true);
    loadTableData(data);
  });

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black biggest bold">Incapacidades</label>

          <div
            className="title-button text-main biggest pointer"
            onClick={() => {
              navigate("../crear");
            }}
          >
            Crear incapacidad <AiOutlinePlusCircle />
          </div>
        </div>
        <div>
          <FormComponent
            id="searchRecordForm"
            className="form-signIn"
            action={onSubmit}
          >
            <div className="container-sections-forms">
              <div className="grid-form-3-container gap-25">
                <SelectComponent
                  idInput={"workerId"}
                  control={control}
                  errors={errors}
                  data={activeWorkerList}
                  label={<>Documento - Nombre empleado</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                  filter={true}
                />
              </div>
            </div>
            <div className="button-save-container-display">
              <ButtonComponent
                value={"Limpiar campos"}
                className="button-clean bold"
                type="button"
                action={() => {
                  setshowTable(false);
                  reset();
                }}
              />
              <ButtonComponent value={"Buscar"} className="button-save big disabled-black" disabled={!workerId} />
            </div>
          </FormComponent>
        </div>

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/incapacity/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={true}
              titleMessageModalNoResult="Sin resultados."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchIncapacity);
