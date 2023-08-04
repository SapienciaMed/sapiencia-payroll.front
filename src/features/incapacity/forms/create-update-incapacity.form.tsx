import {
  FormComponent,
  SelectComponent,
  InputComponent,
  ButtonComponent,
  DatePickerComponent,
  TextAreaComponent,
  SwitchComponent,
  LabelComponent,
} from "../../../common/components/Form";

import { EDirection } from "../../../common/constants/input.enum";

import useListData from "../../vacation/hooks/list.hook";
import useCreateAndUpdateIncapacityHook from "../hooks/createAndUpdateIncapcity.hook";

interface IPropsCreateAndUpdateIncapacityForm {
  action: string;
}

export const CreateUpdateIncapacityForm = ({
  action,
}: IPropsCreateAndUpdateIncapacityForm) => {
  const { activeWorkerList, typesIncapacityList } = useListData();

  const { onSubmit, register, errors, control, showDays, navigate } =
    useCreateAndUpdateIncapacityHook(action);

  return (
    <>
      <FormComponent className="form-signIn" action={onSubmit}>
        <div className="container-sections-forms">
          <div className="grid gap-25">
            {action === "edit" && (
              <div className="grid-span-3-columns">
                <SwitchComponent
                  idInput="isExtension"
                  control={control}
                  errors={errors}
                  direction={EDirection.row}
                  children={
                    <>
                      <LabelComponent
                        value="Prorroga"
                        className="text-black big bold"
                        htmlFor="isExtension"
                      />
                    </>
                  }
                />
              </div>
            )}
            <div className="grid-form-2-container gap-25">
              <SelectComponent
                idInput={"codEmployment"}
                control={control}
                errors={errors}
                data={activeWorkerList}
                label={
                  <>
                    Documento - Nombre empleado <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione"
                filter={true}
              />

              <SelectComponent
                idInput={"codIncapacityType"}
                control={control}
                errors={errors}
                data={typesIncapacityList}
                label={
                  <>
                    Origen de incapacidad <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione"
                filter={false}
              />
            </div>
            <div className="grid-form-3-container gap-25">
              <DatePickerComponent
                idInput={"dateInitial"}
                control={control}
                label={
                  <>
                    Fecha inicio <span>*</span>
                  </>
                }
                errors={errors}
                classNameLabel="text-black big bold"
                className="dataPicker-basic  medium "
                // disabled={disabledFields}
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
              />
              <DatePickerComponent
                idInput={"dateFinish"}
                control={control}
                label={
                  <>
                    Fecha fin <span>*</span>
                  </>
                }
                errors={errors}
                classNameLabel="text-black big bold"
                className="dataPicker-basic  medium "
                // disabled={disabledFields}
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
              />

              <InputComponent
                idInput={""}
                label={
                  <>
                    Total dias <span>*</span>
                  </>
                }
                typeInput={"text"}
                errors={errors}
                disabled={true}
                value={`${showDays()}`}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />

              <div className="grid-span-3-columns">
                <TextAreaComponent
                  label={"Observaciones"}
                  idInput={"comments"}
                  // disabled={disabledFields}
                  className="text-area-basic"
                  classNameLabel="text-black big bold"
                  register={register}
                  errors={errors}
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="button-save-container-display">
          <ButtonComponent
            value={"Cancelar"}
            type="button"
            action={() => navigate("../consultar")}
            className="button-clean bold"
          />
          <ButtonComponent
            value={action !== "new" ? "Editar" : "Guardar"}
            className="button-save big"
          />
        </div>
      </FormComponent>
    </>
  );
};
