import React from "react";

import { HiOutlineTrash } from "react-icons/hi";

import { Control, UseFormSetValue } from "react-hook-form";

import {
  SelectComponent,
  ButtonComponent,
} from "../../../common/components/Form";

import { DatePickerComponent } from "../../../common/components/Form/input-date.component";

import { IVinculation } from "../../../common/interfaces/payroll.interfaces";

import { DevTool } from "@hookform/devtools";

import { InputComponent } from "../../../common/components/Form/input-refactor.component";

import useRelativesInformation from "../hooks/relativesInformation.hook";

interface IFamiliarInformationProp {
  action: string;
  control: Control<IVinculation>;
  setValueRegister: UseFormSetValue<IVinculation>;
  list: any[][];
}

const FamiliarInformationForm = ({
  action,
  control,
  list,
  setValueRegister,
}: IFamiliarInformationProp): React.JSX.Element => {
  const {
    dependentList,
    fields,
    append,
    handleDisabledFields,
    handleModalDelete,
    handleChangeAge,
  } = useRelativesInformation({
    action,
    list,
    control,
    setValueRegister,
  });

  return (
    <div>
      <div className="container-sections-forms">
        <span className="text-black large bold">Datos de familiares</span>
        <form>
          {fields.map((fieldMap, index) => {
            return (
              <div
                key={fieldMap.id}
                className={`grid-form-7-container bg-editing`}
              >
                <InputComponent
                  control={control}
                  idInput={`relatives.${index}.name` as const}
                  typeInput="text"
                  className="input-basic medium"
                  classNameLabel="text-black big break-line bold"
                  label={
                    <>
                      Nombre completo <span>*</span>
                    </>
                  }
                  disabled={handleDisabledFields()}
                />

                <DatePickerComponent
                  idInput={`relatives.${index}.birthDate` as const}
                  control={control}
                  label="Fecha de Nacimiento"
                  classNameLabel="text-black big break-line bold"
                  className="dataPicker-basic medium"
                  placeholder="DD/MM/YYYY"
                  dateFormat="dd/mm/yy"
                  maxDate={new Date()}
                  onChange={handleChangeAge}
                  disabled={handleDisabledFields()}
                />

                <InputComponent
                  control={control}
                  idInput={`relatives.${index}.age` as const}
                  typeInput="text"
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  label={<>Edad</>}
                  disabled={true}
                />

                <SelectComponent
                  idInput={`relatives.${index}.gender` as const}
                  control={control}
                  data={list[0]}
                  label={<>Género</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                  disabled={handleDisabledFields()}
                />

                <SelectComponent
                  idInput={`relatives.${index}.relationship` as const}
                  control={control}
                  data={list[1]}
                  label={
                    <>
                      Parentesco <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                  disabled={handleDisabledFields()}
                />

                <SelectComponent
                  idInput={`relatives.${index}.dependent` as const}
                  control={control}
                  data={dependentList}
                  label={
                    <>
                      Dependiente <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                  disabled={handleDisabledFields()}
                />
                <div>
                  <label
                    htmlFor=""
                    className="text-black big bold display-justify-flex-center"
                  >
                    Acciones
                  </label>

                  <div className="payroll-relatives-container-actions">
                    <ButtonComponent
                      value={<HiOutlineTrash />}
                      type="button"
                      disabled={handleDisabledFields()}
                      action={() => handleModalDelete(index)}
                      className="payroll-relatives-button-delete  disabled-black"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="button-save-container-display">
            <ButtonComponent
              type="button"
              value="Agregar familiar"
              disabled={handleDisabledFields()}
              action={() =>
                append({
                  name: "",
                  birthDate: "",
                  gender: "",
                  age: 0,
                  relationship: "",
                  dependent: null,
                })
              }
              className="button-save extra_large disabled-black"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(FamiliarInformationForm);
