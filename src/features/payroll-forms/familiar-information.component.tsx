import React, { useState } from "react";
import { InputComponent } from "../../common/components/Form/input.component";
import TableComponent from "../../common/components/table.component";
import { SelectComponent } from "../../common/components/Form/select.component";
import { InputGroupComponent } from "../../common/components/Form/input-group.component";
import { EDirection } from "../../common/constants/input.enum";
import { ButtonComponent } from "../../common/components/Form/button.component";
import {HiOutlinePencil, HiOutlineTrash, HiOutlineX} from "react-icons/hi"
import {RiSave3Fill} from "react-icons/ri"

const FamiliarInformationForm = ({ register, errors }: any) => {
  const [fields, setFields] = useState([]);

  // Función para agregar un nuevo campo
  const addField = () => {
    const newField = {
      fullName: "",
      birthDate: "",
      age: "",
      gender: "",
      relationship: "",
      editing: true,
    };
    setFields([...fields, newField]);
  };

  // Función para eliminar un campo
  const deleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  // Función para habilitar la edición de un campo
  const enableEditing = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].editing = true;
    setFields(updatedFields);
  };

  // Función para guardar los cambios de un campo editado
  const saveChanges = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].editing = false;
    setFields(updatedFields);
  };

  // Función para cancelar la edición de un campo
  const cancelEditing = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].editing = false;
    setFields(updatedFields);
  };

  // Función para manejar los cambios en los campos
  const handleFieldChange = (event, index, fieldName) => {
    const updatedFields = [...fields];
    updatedFields[index][fieldName] = event.target.value;
    setFields(updatedFields);
  };
  return (
    <div>
      {/* <div className="grid-form-5-container container-sections-forms">
        <InputGroupComponent
          idInput="numberDocument"
          className="input-group-basic medium"
          typeInput="text"
          register={register}
          classNameLabel="text-black big bold"
          direction={EDirection.row}
          errors={errors}
          placeholder={""}
          iconLegend={"No."}
          containerClassname="ml-5px big"
        />
        <InputComponent
          idInput="fullName"
          className="input-basic medium"
          typeInput="text"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
        />
        <InputComponent
          idInput="birthDate"
          className="input-basic medium"
          typeInput="date"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
        />
        <InputComponent
          idInput="age"
          className="input-basic medium"
          typeInput="text"
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
        />
        <SelectComponent
          idInput="gender"
          placeholder="seleccione"
          classNameLabel="text-black big bold"
          className="select-basic medium"
        />
        <SelectComponent
          idInput="relationship"
          placeholder="seleccione"
          classNameLabel="text-black big bold"
          className="select-basic medium"
        />
        <ButtonComponent value="agregar" id="agregar" />
      </div>
      <div className="container-sections-forms">
        <TableComponent url={""} columns={[]} />
      </div> */}
      <div className="container-sections-forms">
        <span className="text-black large bold">Datos de familiares</span>
        {fields.map((field, index) => (
          <div
            key={index}
            className={`grid-form-6-container  ${!field.editing ? "bg-disabled" :"bg-editing"}`}
          >
            <InputComponent
              idInput={`fullName${index}`}
              className="input-basic medium"
              typeInput="text"
              value={field.fullName}
              onChange={(event) => handleFieldChange(event, index, "fullName")}
              disabled={!field.editing}
              label="Nombre completo"
              classNameLabel="text-black big bold"
              errors={errors}
              register={register}
            />
            <InputComponent
              idInput={`birthDate${index}`}
              className="input-basic medium"
              typeInput="date"
              value={field.birthDate}
              onChange={(event) => handleFieldChange(event, index, "birthDate")}
              disabled={!field.editing}
              classNameLabel="text-black big bold"
              label="Fecha de nacimiento"
              errors={errors}
              register={register}
            />
            <InputComponent
              idInput={`age${index}`}
              className="input-basic medium"
              typeInput="text"
              value={field.age}
              onChange={(event) => handleFieldChange(event, index, "age")}
              disabled={!field.editing}
              classNameLabel="text-black big bold"
              label="Edad"
              errors={errors}
              register={register}
            />
            <SelectComponent
              idInput={`gender${index}`}
              placeholder="seleccione"
              value={field.gender}
              onChange={(event) => handleFieldChange(event, index, "gender")}
              disabled={!field.editing}
              classNameLabel="text-black big bold"
              label="Género"
              errors={errors}
              register={register}
              className="select-basic medium"
            />
            <SelectComponent
              idInput={`relationship${index}`}
              placeholder="seleccione"
              value={field.relationship}
              onChange={(event) =>
                handleFieldChange(event, index, "relationship")
              }
              disabled={!field.editing}
              classNameLabel="text-black big bold"
              label="Parentesco"
              errors={errors}
              register={register}
              className="select-basic medium"
            />
            <div>
              <label htmlFor="" className="text-black big bold">Acciones</label>
              <div>
                {field.editing ? (
                  <>
                    <ButtonComponent
                      value={<RiSave3Fill/>}
                      type="button"
                      action={() => saveChanges(index)}
                      className="button-confirm"
                    />
                    <ButtonComponent
                      value={<HiOutlineX/>}
                      type="button"
                      action={() => cancelEditing(index)}
                      className="button-cancel-edit"
                    />
                  </>
                ) : (
                  <>
                    <ButtonComponent
                      value={<HiOutlinePencil/>}
                      type="button"
                      action={() => enableEditing(index)}
                      className="button-edit "
                    />
                    <ButtonComponent
                      value={<HiOutlineTrash/>}
                      type="button"
                      action={() => deleteField(index)}
                      className="button-delete"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="display-justify-flex-end">
          <ButtonComponent
            type="button"
            value="Agregar familiar"
            action={addField}
            className="button-save large"
          />
        </div>
      </div>
    </div>
  );
};

export default FamiliarInformationForm;
