import React from "react";
import useSearchSpreadSheetHook from "../hooks/searchSpreadSheet.hook";
import TableComponent from "../../../common/components/table.component";

import { FilterSpreadSheetForm } from "../forms/filter-spreadsheet.form";

const SearchSpreadSheetPage = (): React.JSX.Element => {
  const {
    control,
    formState,
    showTable,
    formValues,
    tableComponentRef,
    typesSpreadSheetList,
    stateSpreadSheetList,
    tableColumns,
    tableActions,
    onSubmit,
    redirectCreate,
    clearFields,
  } = useSearchSpreadSheetHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">Planillas</label>
        </div>

        <FilterSpreadSheetForm
          {...{
            control,
            formState,
            formValues,
            typesSpreadSheetList,
            stateSpreadSheetList,
            onSubmit,
            redirectCreate,
            clearFields,
          }}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/payroll/get-paginated`}
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

export default React.memo(SearchSpreadSheetPage);
