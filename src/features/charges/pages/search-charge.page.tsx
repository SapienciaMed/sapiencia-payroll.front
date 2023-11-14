import React from "react";
import useSearchSpreadSheetHook from "../hooks/searchCharge.hook";
import TableComponent from "../../../common/components/table.component";

import { FilterChargeForm } from "../forms/filter-charge.form";

const SearchChargePage = (): React.JSX.Element => {
  const {
    control,
    formState,
    showTable,
    formValues,
    tableComponentRef,
    typesChargesList,
    tableColumns,
    tableActions,
    onSubmit,
    redirectCreate,
    clearFields,
    register
  } = useSearchSpreadSheetHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">Cargos</label>
        </div>

        <FilterChargeForm
          {...{
            control,
            formState,
            formValues,
            typesChargesList,
            onSubmit,
            redirectCreate,
            clearFields,
            register
          }}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/charges/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchChargePage);
