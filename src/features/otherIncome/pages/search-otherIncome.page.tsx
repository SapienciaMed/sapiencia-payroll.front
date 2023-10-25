import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import useSearchOtherIncomeHook from "../hooks/searchOtherIncome.hook";
import TableComponent from "../../../common/components/table.component";

import { FilterOtherIncomeForm } from "../forms/filter-otherIncome.form";

export const SearchOtherIncomePage = (): React.JSX.Element => {
  const {
    control,
    formState,
    formValues,
    activeWorkerList,
    periodsList,
    showTable,
    tableComponentRef,
    tableColumns,
    tableActions,
    onSubmit,
    clearFields,
    redirectCreate,
  } = useSearchOtherIncomeHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Consultar otros ingresos
          </label>

          <div
            className="title-button text-main biggest pointer"
            onClick={redirectCreate}
          >
            Crear otros ingresos <AiOutlinePlusCircle />
          </div>
        </div>

        <FilterOtherIncomeForm
          control={control}
          formState={formState}
          activeWorkerList={activeWorkerList}
          periodsList={periodsList}
          clearFields={clearFields}
          onSubmit={onSubmit}
          formValues={formValues}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/otherIncome/get-paginated`}
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

export default React.memo(SearchOtherIncomePage);
