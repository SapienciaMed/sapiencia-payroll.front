import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import useSearchIncomeDeductionsHook from "../hooks/searchIncomeDeductions.hook";
import TableComponent from "../../../common/components/table.component";

import { FilterIncomeDeductionsForm } from "../forms/filter-incomeDeductions.form";

export const SearchIncomeDeductionsPage = (): React.JSX.Element => {
  const {
    control,
    formState,
    formValues,
    activeWorkerList,
    showTable,
    tableComponentRef,
    tableColumns,
    tableActions,
    onSubmit,
    clearFields,
    redirectCreate,
  } = useSearchIncomeDeductionsHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Consultar deducciones de renta
          </label>

          <div
            className="title-button text-main biggest pointer"
            onClick={redirectCreate}
          >
            Crear deducciones de renta <AiOutlinePlusCircle />
          </div>
        </div>

        <FilterIncomeDeductionsForm
          control={control}
          formState={formState}
          activeWorkerList={activeWorkerList}
          clearFields={clearFields}
          onSubmit={onSubmit}
          formValues={formValues}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/taxDeductible/get-paginated`}
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

export default React.memo(SearchIncomeDeductionsPage);
