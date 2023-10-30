import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  FormComponent,
  SelectComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import TableComponent from "../../../common/components/table.component";

import useSearchSuspensionContract from "../hooks/search-suspensioncontract.hook";

const SearchSuspensionContractPage = (): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmitSearchSuspensionContract,
    clearFields,
    redirectCreate,
    tableComponentRef,
    activeContractorsList,
    showTable,
    tableColumns,
    tableActions,
  } = useSearchSuspensionContract();

  const { errors, isValid } = formState;

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Suspensión de contrato
          </label>

          <div
            className="title-button text-main biggest pointer"
            onClick={redirectCreate}
          >
            Crear suspension <AiOutlinePlusCircle />
          </div>
        </div>

        <FormComponent
          id="searchRecordForm"
          className="form-signIn"
          action={onSubmitSearchSuspensionContract}
        >
          <div className="grid-form-3-container gap-25">
            <SelectComponent
              idInput={"codEmployment"}
              control={control}
              errors={errors}
              data={activeContractorsList}
              label={
                <>
                  Documento - Nombre del empleado. <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
              filter={true}
            />
          </div>

          <div className="button-save-container-display m-top-20">
            <ButtonComponent
              value={"Limpiar campos"}
              className="button-clean bold"
              type="button"
              action={clearFields}
            />
            <ButtonComponent
              value={"Buscar"}
              className="button-save disabled-black big"
              disabled={!isValid}
            />
          </div>
        </FormComponent>

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiPayroll}/api/v1/vinculation/suspension/get-paginated`}
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

export default React.memo(SearchSuspensionContractPage);
