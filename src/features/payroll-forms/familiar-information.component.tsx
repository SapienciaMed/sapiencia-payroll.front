import React, { useState } from "react";
import { InputComponent } from "../../common/components/Form/input.component";
import { SelectComponent } from "../../common/components/Form/select.component";
import { ButtonComponent } from "../../common/components/Form/button.component";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import { RiSave3Fill } from "react-icons/ri";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useYupValidationResolver from "../../common/interfaces/form-validator.hook";
import { familiarValidator } from "../../common/schemas/employment-schema";
import { DatePickerComponent } from "../../common/components/Form/input-date.component";

type FormValues = {
  familiar: {
    fullName: string;
    birthDate: Date | string;
    age: number;
    gender: string;
    relationship: string;
  }[];
};

const FamiliarInformationForm = ({ register, errors1, list }: any) => {
  const [disabledRows, setDisabledRows] = useState<boolean[]>([true]);
  const [age, setAge] = useState(null);
  const resolver = useYupValidationResolver(familiarValidator);
  const {
    register: registerFamily,
    handleSubmit,
    control,
    setValue: setValueRegister,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      familiar: [
        { fullName: "", birthDate: "", age: 0, gender: "", relationship: "" },
      ],
    },
    mode: "all",
    resolver,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familiar",
    rules: {
      required: "Please append at least 1 item",
    },
  });

  const onSubmit = handleSubmit(async (data: any) => {
    console.log("Submit data", data);
  });

  const handleEnableRow = (index: number) => {
    const updatedDisabledRows = [...disabledRows];
    updatedDisabledRows[index] = false;
    setDisabledRows(updatedDisabledRows);
  };

  const handleDisableRow = (index: number) => {
    const updatedDisabledRows = [...disabledRows];
    updatedDisabledRows[index] = true;
    setDisabledRows(updatedDisabledRows);
  };

  return (
    <div>
      <div className="container-sections-forms">
        <span className="text-black large bold">Datos de familiares</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`grid-form-6-container  ${
                !disabledRows[index] ? "bg-editing" : "bg-disabled"
              }`}
            >
              <InputComponent
                idInput={`familiar.${index}.fullName`}
                id={`fullName${index}`}
                className="input-basic medium"
                typeInput="text"
                disabled={disabledRows[index]}
                label="Nombre completo"
                classNameLabel="text-black big bold"
                errors={errors}
                register={registerFamily}
              />
              <Controller
                control={control}
                name={`familiar.${index}.birthDate`}
                render={({ field }) => {
                  return (
                    <DatePickerComponent
                      id={field.name}
                      idInput={`familiar.${index}.birthDate`}
                      value={field.value}
                      label="Fecha de Nacimiento"
                      register={registerFamily}
                      errors={errors}
                      classNameLabel="text-black big bold"
                      setValueRegister={setValueRegister}
                      onchange={field.onChange}
                      disabled={disabledRows[index]}
                      className="select-basic medium"
                      setValue={setAge}
                    />
                  );
                }}
              />

              <InputComponent
                idInput={`familiar.${index}.age`}
                id={`age${index}`}
                className="input-basic medium"
                typeInput="text"
                classNameLabel="text-black big bold"
                label="Edad"
                disabled={true}
                errors={errors}
                register={registerFamily}
                value={age}
              />
              <SelectComponent
                idInput={`familiar.${index}.gender`}
                placeholder="seleccione"
                disabled={disabledRows[index]}
                classNameLabel="text-black big bold"
                label="Género"
                errors={errors}
                register={registerFamily}
                data={list[0]}
                className="select-basic medium"
                setValueRegister={setValueRegister}
              />
              <SelectComponent
                idInput={`familiar.${index}.relationship`}
                placeholder="seleccione"
                disabled={disabledRows[index]}
                classNameLabel="text-black big bold"
                label="Parentesco"
                errors={errors}
                register={registerFamily}
                data={list[1]}
                className="select-basic medium"
                setValueRegister={setValueRegister}
              />
              <div>
                <label htmlFor="" className="text-black big bold">
                  Acciones
                </label>
                <div>
                  {!disabledRows[index] ? (
                    <>
                      <ButtonComponent
                        value={<RiSave3Fill />}
                        type="button"
                        action={() => {
                          handleDisableRow(index);
                          onSubmit();
                        }}
                        className="button-confirm"
                      />
                      <ButtonComponent
                        value={<HiOutlineX />}
                        type="button"
                        action={() => handleDisableRow(index)}
                        className="button-cancel-edit"
                      />
                    </>
                  ) : (
                    <>
                      <ButtonComponent
                        value={<HiOutlinePencil />}
                        type="button"
                        action={() => handleEnableRow(index)}
                        className="button-edit"
                      />
                      <ButtonComponent
                        value={<HiOutlineTrash />}
                        type="button"
                        action={() => remove(index)}
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
              action={() =>
                append({
                  fullName: "",
                  birthDate: "",
                  age: 0,
                  gender: "",
                  relationship: "",
                })
              }
              className="button-save large"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamiliarInformationForm;
