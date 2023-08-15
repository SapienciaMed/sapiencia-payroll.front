import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ButtonComponent, FormComponent, SelectComponent } from "../../../common/components/Form";
import TableComponent from "../../../common/components/table.component";
import useSearchLicenceData from "../hooks/search-licence.hook";
import useLicenceData from "../hooks/create-licence.hook";

const SearchLicencePage = () => {
    const {onSubmit,tableActions,tableColumns,navigate,tableComponentRef,reset,control,errors} = useSearchLicenceData()
    const {activeWorkerList,licenceTypesList,listLicencesStates} = useLicenceData()
  return (
    <>
      <div className="container-sections-forms m-24px">
        <div className="title-area">
          <label className="text-black extra-large bold">Licencias</label>

          <div
            className="title-button text-main biggest pointer"
            onClick={() => {
              navigate('../crear');
            }}
          >
            Crear Licencia <AiOutlinePlusCircle />
          </div>
        </div>
        <div>
          <FormComponent
            id="searchRecordForm"
            className="form-signIn"
            action={onSubmit}
          >
            <div className="container-sections-forms">
              <div className="grid-form-3-container gap-25">
                <div className="grid-span-2-columns">
                <SelectComponent
                  idInput={"codEmployment"}
                  control={control}
                  errors={errors}
                  data={activeWorkerList}
                  label={"Documento - Nombre empleado"}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                  filter={true}
                />
                </div>
                
                <SelectComponent
                  idInput={"idLicenceType"}
                  control={control}
                  errors={errors}
                  data={licenceTypesList}
                  label={"Tipo de licencias"}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                />
                <SelectComponent
                  idInput={"licenceState"}
                  control={control}
                  errors={errors}
                  data={listLicencesStates}
                  label={"Estado"}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione"
                />
              </div>
            </div>
            <div className="button-save-container-display">
              <ButtonComponent
                value={"Limpiar campos"}
                className="button-clean bold"
                type="button"
                action={() => {
                  reset();
                  tableComponentRef.current.emptyData();
                }}
              />
              <ButtonComponent value={"Buscar"} className="button-save big" />
            </div>
          </FormComponent>
        </div>

        <div className="container-sections-forms">
          <TableComponent
            ref={tableComponentRef}
            url={`${process.env.urlApiPayroll}/api/v1/licence/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(SearchLicencePage);
