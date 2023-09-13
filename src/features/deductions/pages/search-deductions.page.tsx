import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import { FilterDeductionsForm } from "../forms/filter-deductions.form";

import useSearchDeductionsHook from "../hooks/searchDeductions.hook";

import TableComponent from "../../../common/components/table.component";

const SearchDeductions = (): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    typeDeductionList,
    lastPeriodsList,
    formValues,
    showTable,
    charges,
    tableComponentRef,
    tableColumns,
    tableActions,
  } = useSearchDeductionsHook();

    return (
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black extra-large bold">Deducciones</label>
            
            <div
              className="title-button text-main biggest pointer"
              onClick={redirectCreate}
            >
              Crear deducción <AiOutlinePlusCircle />
            </div>
        </div>
          
        <FilterDeductionsForm
          control={control}
          formState={formState}
          typeDeductionList = {typeDeductionList}
          lastPeriodsList={lastPeriodsList}
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
            url={`${process.env.urlApiPayroll}/api/v1/deduction/get-paginated`}
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
  
  export default React.memo(SearchDeductions);