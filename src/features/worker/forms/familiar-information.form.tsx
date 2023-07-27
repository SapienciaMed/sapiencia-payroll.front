import React, { useContext, useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import { RiSave3Fill } from "react-icons/ri";
import { UseFormGetValues, useFieldArray, useForm } from "react-hook-form";
import {
  InputComponent,
  SelectComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {
  IRelative,
  IVinculation,
} from "../../../common/interfaces/payroll.interfaces";
import { familiarValidator } from "../../../common/schemas";
import { AppContext } from "../../../common/contexts/app.context";
import { calculateDifferenceYear } from "../../../common/utils/helpers";

interface IFamiliarInformationProp {
  setFamilyData: React.Dispatch<
    React.SetStateAction<{
      familiar: IRelative[];
    }>
  >;
  familyData: { familiar: IRelative[] };
  list: any[][];
  action: string;
  getValueRegister: UseFormGetValues<IVinculation>;
  data: IVinculation;
}
const FamiliarInformationForm = ({
  setFamilyData,
  list,
  action,
  familyData,
}: IFamiliarInformationProp) => {
  const { setDisabledFields, disabledFields } = useContext(AppContext);
  setDisabledFields(action == "view" ? true : false);

  const resolver = useYupValidationResolver(familiarValidator);

  const {
    register: registerFamily,
    handleSubmit,
    control,
    setValue: setValueRegister,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm<{ familiar: IRelative[] }>({
    defaultValues: {
      familiar: familyData.familiar,
    },
    mode: "all",
    resolver,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familiar",
  });

  const [disabledRows, setDisabledRows] = useState<boolean[]>(
    Array.from({ length: fields?.length }, () => true)
  );

  const onSubmit = handleSubmit((data: any) => {
    setFamilyData(data);
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
    if (familyData?.familiar?.length > 0) {
      setValueRegister("familiar", familyData.familiar);
    }
  }, [familyData]);

  return (
    <div>
      <div className="container-sections-forms">
        <span className="text-black large bold">Datos de familiares</span>
        <form>
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

              <DatePickerComponent
                idInput={`familiar.${index}.birthDate`}
                control={control}
                label="Fecha de Nacimiento"
                errors={errors}
                classNameLabel="text-black big break-line bold"
                className="dataPicker-basic medium"
                disabled={disabledRows[index] || disabledFields}
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
                fieldArray={true}
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
                value={`${
                  watch(`familiar.${index}.birthDate`)
                    ? calculateDifferenceYear(
                        watch(`familiar.${index}.birthDate`)
                      )
                    : 0
                }`}
                fieldArray={true}
              />
              <SelectComponent
                idInput={`familiar.${index}.gender`}
                control={control}
                errors={errors}
                data={list[0]}
                label={<>Género</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Tipo"
                disabled={disabledRows[index] || disabledFields}
                fieldArray={true}
              />
              <SelectComponent
                idInput={`familiar.${index}.relationship`}
                control={control}
                errors={errors}
                data={list[1]}
                label={<>Parentesco</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Tipo"
                disabled={disabledRows[index] || disabledFields}
                fieldArray={true}
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
                          onSubmit();

                          if (isValid) {
                            handleDisableRow(index);
                          }
                        }}
                        className="button-confirm"
                        disabled={disabledFields}
                      />
                      <ButtonComponent
                        value={<HiOutlineX />}
                        type="button"
                        action={() => {
                          if (isValid) {
                            handleDisableRow(index);
                          }
                        }}
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
                        action={() => {
                          remove(index);
                          const data = getValues("familiar");
                          setFamilyData({ familiar: data });
                        }}
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
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default React.memo(FamiliarInformationForm);
