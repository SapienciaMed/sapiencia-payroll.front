import React, { useContext, useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import { RiSave3Fill } from "react-icons/ri";
import { Controller, UseFormGetValues, useFieldArray, useForm } from "react-hook-form";
import {
  InputComponent,
  SelectComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IRelative, IVinculation } from "../../../common/interfaces/payroll.interfaces";
import { familiarValidator } from "../../../common/schemas";
import { AppContext } from "../../../common/contexts/app.context";

interface IFamiliarInformationProp {
  setFamilyData: React.Dispatch<
    React.SetStateAction<{
      familiar: IRelative[];
    }>
  >;
  list: any[][];
  action: string;
  changedData:number;
  getValueRegister:UseFormGetValues<IVinculation>;
}
const FamiliarInformationForm = ({
  setFamilyData,
  list,
  action,
  getValueRegister,
  changedData
}: IFamiliarInformationProp) => {
  const { setDisabledFields, disabledFields } = useContext(AppContext);
  setDisabledFields(action == "view" ? true : false);
  const [disabledRows, setDisabledRows] = useState<boolean[]>([true]);
  const [age, setAge] = useState("0");
  const resolver = useYupValidationResolver(familiarValidator);
  const {
    register: registerFamily,
    handleSubmit,
    control,
    setValue: setValueRegister,
    formState: { errors, isValid },
  } = useForm<{ familiar: IRelative[] }>({
    defaultValues: {
      familiar: [{ name: "", birthDate: "", gender: "", relationship: "" }],
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
    setFamilyData(data);
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
  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

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
                idInput={`familiar.${index}.name`}
                id={`fullName${index}`}
                className="input-basic medium"
                typeInput="text"
                disabled={disabledRows[index] || disabledFields}
                label="Nombre completo"
                classNameLabel="text-black big bold"
                errors={errors}
                register={registerFamily}
                fieldArray={true}
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
                      classNameLabel="text-black big break-line bold"
                      setValueRegister={setValueRegister}
                      onchange={field.onChange}
                      disabled={disabledRows[index] || disabledFields}
                      className="dataPicker-basic medium"
                      setValue={setAge}
                      maxDate={new Date()}
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
                value={age ? age : "0"}
              />
              <Controller
                name={`familiar.${index}.gender`}
                control={control}
                render={({ field }) => (
                  <SelectComponent
                    id={field.name}
                    idInput={field.name}
                    label="Género"
                    register={registerFamily}
                    errors={errors}
                    data={list[0]}
                    disabled={disabledRows[index] || disabledFields}
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    value={field.value}
                    setValueRegister={setValueRegister}
                    getValueRegister={getValueRegister}
                    change={changedData}
                    onchange={field.onChange}
                  />
                )}
              />
              <Controller
                name={`familiar.${index}.relationship`}
                control={control}
                render={({ field }) => (
                  <SelectComponent
                    id={field.name}
                    idInput={field.name}
                    label="Parentesco"
                    register={registerFamily}
                    errors={errors}
                    data={list[1]}
                    disabled={disabledRows[index] || disabledFields}
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    value={field.value}
                    setValueRegister={setValueRegister}
                    getValueRegister={getValueRegister}
                    change={changedData}
                    onchange={field.onChange}
                  />
                )}
              />
              <div>
                <label
                  htmlFor=""
                  className="text-black big bold display-justify-flex-center"
                >
                  Acciones
                </label>
                <div className="button-container-display">
                  {!disabledRows[index] ? (
                    <>
                      <ButtonComponent
                        value={<RiSave3Fill />}
                        type="button"
                        action={() => {
                          if (isValid) {
                            handleDisableRow(index);
                            onSubmit();
                          }
                        }}
                        className="button-confirm"
                        disabled={disabledFields}
                      />
                      <ButtonComponent
                        value={<HiOutlineX />}
                        type="button"
                        action={() => handleDisableRow(index)}
                        className="button-cancel-edit"
                        disabled={disabledFields}
                      />
                    </>
                  ) : (
                    <>
                      <ButtonComponent
                        value={<HiOutlinePencil />}
                        type="button"
                        action={() => handleEnableRow(index)}
                        className="button-edit"
                        disabled={disabledFields}
                      />
                      <ButtonComponent
                        value={<HiOutlineTrash />}
                        type="button"
                        action={() => remove(index)}
                        className="button-delete"
                        disabled={disabledFields}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="button-save-container-display">
            <ButtonComponent
              type="button"
              value="Agregar familiar"
              action={() =>
                append({
                  name: "",
                  birthDate: "",
                  gender: "",
                  relationship: "",
                })
              }
              className="button-save large"
              disabled={disabledFields}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(FamiliarInformationForm);
