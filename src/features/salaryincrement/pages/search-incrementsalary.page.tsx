import React from "react";

import { FilterIncrementSalaryForm } from "../forms/filter-incrementsalary.form";

import useSearchIncrementSalaryHook from "../hooks/searchIncrementSalary.hook";

import TableComponent from "../../../common/components/table.component";

const SearchIncrementSalary = (): React.JSX.Element => {
  const {
    register,
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    formValues,
    showTable,
    charges,
    tableComponentRef,
    tableColumns,
    tableActions,
  } = useSearchIncrementSalaryHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Incremento de salario
          </label>
        </div>

        <FilterIncrementSalaryForm
          register={register}
          control={control}
          formState={formState}
          redirectCreate={redirectCreate}
          clearFields={clearFields}
          onSubmit={onSubmit}
          chargesState={charges}
          formValues={formValues}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/salaryIncrease/get-paginated`}
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

export default React.memo(SearchIncrementSalary);
