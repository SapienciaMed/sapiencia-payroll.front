import React, { useRef, useContext, useState } from "react";
import TableComponent from "../../../common/components/table.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { useForm } from "react-hook-form";
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
  IFilterVinculation,
  IGetVinculation,
} from "../../../common/interfaces/payroll.interfaces";
import { useNavigate } from "react-router-dom";
import useEmploymentsData from "../hooks/employment.hook";
import { removeEmptySpace } from "../../../common/utils/helpers";
import { AppContext } from "../../../common/contexts/app.context";

const EmploymentRecordsPage = () => {
  const { typesContracts, activeWorker } = useEmploymentsData();
  const [tableView, setTableView] = useState<boolean>(false);
  const tableComponentRef = useRef(null);
  const navigate = useNavigate();

  const { setMessage } = useContext(AppContext);
  //const resolver = useYupValidationResolver(searchRecord);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue: setValueRegister,
    control,
    reset,
  } = useForm<IFilterVinculation>();
  const tableColumns: ITableElement<IGetVinculation>[] = [
    {
      fieldName: "numberDocument",
      header: "Tipo y # documento",
      renderCell: (row) => {
        return <>{row.typeDocument + " " + row.numberDocument}</>;
      },
    },
    {
      fieldName: "firstName",
      header: "Nombres y Apellidos",
      renderCell: (row) => {
        return (
          <>
            {row.firstName +
              " " +
              row.secondName +
              " " +
              row.surname +
              " " +
              row.secondSurname}
          </>
        );
      },
    },
    {
      fieldName: "employment.typesContracts",
      header: "Tipo de vinculación",
      renderCell: (row) => {
        return <>{row.employment?.typesContracts[0].name}</>;
      },
    },
    {
      fieldName: "employment.startDate",
      header: "Fecha inicio",
      renderCell: (row) => {
        return (
          <>
            {DateTime.fromISO(
              String(row.employment.startDate)
            ).toLocaleString()}
          </>
        );
      },
    },
    {
      fieldName: "employment.endDate",
      header: "Fecha fin",
      renderCell: (row) => {
        return (
          <>
            {DateTime.fromISO(String(row.employment.endDate)).toLocaleString()}
          </>
        );
      },
    },
    {
      fieldName: "employment.retirementDate",
      header: "Fecha retiro",
      renderCell: (row) => {
        return (
          <>
            {row.employment.retirementDate
              ? DateTime.fromISO(String(row.employment.retirementDate)).toLocaleString()
              : "Sin fecha de retiro"}
          </>
        );
      },
    },
    {
      fieldName: "employment.state",
      header: "Estado",
      renderCell: (row) => {
        console.log(row.employment.state);
        return <>{row.employment.state !== "0" ? "Activo" : "Inactivo"}</>;
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
        if (row.employment.state !== "0") {
          navigate(`./edit/${row.id}`);
        } else {
          setMessage({
            title: "Vinculación inactiva",
            description: `No se permite editar la vinculacion debido a su estado inactiva.`,
            show: true,
            okTitle: "Aceptar",
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
        }
      },
    },
  ];

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const onSubmit = handleSubmit(async (data: IFilterVinculation) => {
    const names = removeEmptySpace(data.name);
    const surNames = removeEmptySpace(data.lastName);
    const datafilter = {
      ...data,
      firtsName: names.length > 0 ? names[0] : "",
      secondName: names.length > 1 ? names[1] : "",
      surname: surNames.length > 0 ? surNames[0] : "",
      secondSurname: surNames.length > 1 ? surNames[0] : "",
    };
    loadTableData(datafilter);
  });

  return (
    <>
      <div className="container-sections-forms m-24px">
        <div>
          <span className="text-black extra-large bold">
            Consultar Expediente
          </span>
        </div>
        <div>
          <FormComponent
            id="searchRecordForm"
            className="form-signIn"
            action={onSubmit}
          >
            <div className="container-sections-forms">
              <div className="grid-form-3-container gap-25">
                <InputComponent
                  idInput={"documentNumber"}
                  label={<>No. Documento</>}
                  typeInput={"text"}
                  register={register}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <SelectComponent
                  idInput={"state"}
                  control={control}
                  errors={errors}
                  data={activeWorker}
                  label={<>Estado</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                />
                <SelectComponent
                  idInput={"vinculationType"}
                  control={control}
                  errors={errors}
                  data={typesContracts}
                  label={<>Tipo de vinculación</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                />
              </div>
              <div className="grid-form-2-container gap-25 mt-14px">
                <InputComponent
                  idInput={"name"}
                  label={<>Nombre</>}
                  typeInput={"text"}
                  register={register}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput={"lastName"}
                  label={<>Apellido</>}
                  typeInput={"text"}
                  register={register}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
            </div>
            <div className="button-save-container-display">
              <ButtonComponent
                value={"Limpiar campos"}
                className="button-clean bold"
                type="button"
                action={() => {
                  reset();
                  tableComponentRef.current.emptyData();
                  setTableView(false);
                }}
              />
              <ButtonComponent
                value={"Buscar"}
                className="button-save big"
                form="searchRecordForm"
                action={() => {
                  setTableView(true);
                }}
                type="submit"
              />
            </div>
          </FormComponent>
        </div>
        {tableView && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/vinculation/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(EmploymentRecordsPage);
