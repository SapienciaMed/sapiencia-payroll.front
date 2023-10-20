import { useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../common/components/Form";
import TableComponent from "../../../common/components/table.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useSearchVacationData from "../hooks/search-vacation.hook";

const SearchVacationPage = () => {
  const [tableView, setTableView] = useState<boolean>(false);
  const {
    navigate,
    onSubmit,
    control,
    errors,
    activeWorkerList,
    listPeriods,
    reset,
    tableComponentRef,
    period,
    workerId,
    tableColumns,
    tableActions,
    setMessage,
    validateActionAccess,
  } = useSearchVacationData();

  return (
    <>
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black extra-large bold">Vacaciones</label>

            <div
              className="title-button text-main biggest pointer"
              onClick={() => {
                if (validateActionAccess("VACACION_CREAR")) {
                  navigate("../crear");
                } else {
                  setMessage({
                    title: "Crear Vacaciones",
                    show: true,
                    OkTitle: "Aceptar",
                    description: "No tienes permisos para esta acción",
                    size: "large",
                    background: true,
                  });
                }
              }}
            >
              Crear vacaciones <AiOutlinePlusCircle />
            </div>
          </div>
          <div>
            <FormComponent
              id="searchRecordForm"
              className="form-signIn"
              action={onSubmit}
            >
              <div className="container-sections-forms">
                <div className="grid-form-2-container gap-25">
                  <SelectComponent
                    idInput={"workerId"}
                    control={control}
                    errors={errors}
                    data={activeWorkerList}
                    label={"Documento-Nombre del empleado"}
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccione"
                    filter={true}
                  />
                  <SelectComponent
                    idInput={"period"}
                    control={control}
                    errors={errors}
                    data={listPeriods}
                    label={"Periodo"}
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccione"
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
                  className="button-save disabled-black big"
                  action={() => {
                    setTableView(true);
                  }}
                  disabled={!period && !workerId}
                />
              </div>
            </FormComponent>
          </div>
          {tableView && (
            <div className="container-sections-forms">
              <TableComponent
                ref={tableComponentRef}
                url={`${process.env.urlApiPayroll}/api/v1/vacations/get-paginated`}
                columns={tableColumns}
                actions={tableActions}
                isShowModal={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchVacationPage;
