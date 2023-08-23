import React from "react";

import { FilterIncrementSalary } from "../forms/filter-incrementsalary.form";

import useSearchIncrementSalaryHook from "../hooks/searchIncrementSalary.hook";

const SearchIncrementSalary = (): React.JSX.Element => {
  const { redirectCreate, onSubmit, control, errors } =
    useSearchIncrementSalaryHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Incremento de salario
          </label>
        </div>

        <FilterIncrementSalary
          redirectCreate={redirectCreate}
          control={control}
          errors={errors}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default React.memo(SearchIncrementSalary);
