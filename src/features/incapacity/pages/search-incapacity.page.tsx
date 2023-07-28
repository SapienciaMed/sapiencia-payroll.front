import React, { useRef } from "react";
import TableComponent from "../../../common/components/table.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { Controller, useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRecord } from "../../../common/schemas";
import { DateTime } from "luxon";
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
  IFilterVinculation,
  IGetVinculation,
} from "../../../common/interfaces/payroll.interfaces";
import { useNavigate } from "react-router-dom";
import useListData from "../../vacation/hooks/list.hook";
import { AiOutlinePlusCircle } from "react-icons/ai";

const SearchIncapacity = () => {
  const { activeWorkerList } = useListData();
  const tableComponentRef = useRef(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IFilterIncapacity>({ defaultValues: { idUser: "" } });

  const tableColumns: ITableElement<IGetVinculation>[] = [
    {
      fieldName: "numberDocument",
      header: "Numero de documento",
      renderCell: (row) => {
        return <>{row.numberDocument}</>;
      },
    },
    {
      fieldName: "firstName",
      header: "Nombres completo",
      renderCell: (row) => {
        return (
          <>
            {`${row.firstName}
               ${row.secondName} 
               ${row.surname}
               ${row.secondSurname}`}
          </>
        );
      },
    },
    {
      fieldName: "employment.typesContracts",
      header: "Origen incapacidad",
      renderCell: (row) => {
        return <>{row.employment?.typesContracts[0].name}</>;
      },
    },
  ];
  const tableActions: ITableAction<IGetVinculation>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        navigate(`./view/${row?.id}`);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`./edit/${row.id}`);
      },
    },
  ];

  function loadTableData(filterVinculation: IFilterIncapacity): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(filterVinculation);
    }
  }

  const onSubmit = handleSubmit(async (data: IFilterVinculation) => {
    //console.log(data);
    //loadTableData(data);
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
                  idInput={"idUser"}
                  control={control}
                  errors={errors}
                  data={activeWorkerList}
                  label={<>Documento - Nombre empleado</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                  filter={true}
                />
              </div>
            </div>
            <div className="button-save-container-display">
              <ButtonComponent
                value={"Limpiar campos"}
                className="button-clean bold"
                type="button"
                action={reset}
              />
              <ButtonComponent value={"Buscar"} className="button-save big" />
            </div>
          </FormComponent>
        </div>

        <div className="container-sections-forms">
          <TableComponent
            ref={tableComponentRef}
            url={`${process.env.urlApiPayroll}/api/v1/employment/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={true}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(SearchIncapacity);
