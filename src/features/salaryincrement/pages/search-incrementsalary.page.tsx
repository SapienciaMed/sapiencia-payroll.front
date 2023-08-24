import React from "react";

import { FilterIncrementSalary } from "../forms/filter-incrementsalary.form";

import useSearchIncrementSalaryHook from "../hooks/searchIncrementSalary.hook";

import TableComponent from "../../../common/components/table.component";

let render = 0;

const SearchIncrementSalary = (): React.JSX.Element => {
  const {
    register,
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    showTable,
    charges,
    tableComponentRef,
    tableColumns,
    tableActions,
  } = useSearchIncrementSalaryHook();

  render++;

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Incremento de salario
          </label>
        </div>

        <FilterIncrementSalary
          register={register}
          control={control}
          formState={formState}
          redirectCreate={redirectCreate}
          clearFields={clearFields}
          onSubmit={onSubmit}
          chargesState={charges}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/licence/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={false}
            />
          </div>
        )}
      </div>
      {render}
    </div>
  );
};

export default React.memo(SearchIncrementSalary);
