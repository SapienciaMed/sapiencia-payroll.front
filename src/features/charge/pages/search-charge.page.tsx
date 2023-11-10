import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

//import { FilterDeductionsForm } from "../forms/filter-deductions.form";

import useSearchChargeHook from "../hooks/searchCharge.hook";

import TableComponent from "../../../common/components/table.component";
import { FilterChargeForm } from "../forms/filter-charge.form";

const SearchCharges = (): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    formValues,
    showTable,
    tableComponentRef,
    tableColumns,
    tableActions,
    validateActionAccess,
    setMessage,
  } = useSearchChargeHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">Consultar cargo</label>

          <div
            className="title-button text-main biggest pointer"
            onClick={() => {
              if (validateActionAccess("CREAR_CARGOS")) {
                redirectCreate();
              } else {
                setMessage({
                  title: "Crear cargo",
                  show: true,
                  OkTitle: "Aceptar",
                  description: "No tienes permisos para esta acción",
                  background: true,
                });
              }
            }}
          >
            Crear cargo <AiOutlinePlusCircle />
          </div>
        </div>

        <FilterChargeForm
          control={control}
          formState={formState}
          clearFields={clearFields}
          onSubmit={onSubmit}
          formValues={formValues}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/charges/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchCharges);
