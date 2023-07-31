import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FormComponent,
  SelectComponent,
  InputComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ICreateAndUpdateIncapacity } from "../../../common/interfaces/payroll.interfaces";
import { createAndUpdateIncapacity } from "../../../common/schemas";
import { calculateDifferenceDays } from "../../../common/utils/helpers";
import useListData from "../../vacation/hooks/list.hook";

export const CreateIncapacityForm = () => {
  const { activeWorkerList } = useListData();

  const navigate = useNavigate();

  const resolver = useYupValidationResolver(createAndUpdateIncapacity);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  } = useForm<ICreateAndUpdateIncapacity>({
    defaultValues: {},
    resolver,
    mode: "all",
  });

  const [startDate, endDate] = watch(["startDate", "endDate"]);

  const showDays = () => {
    if (startDate && endDate) {
      return calculateDifferenceDays(startDate, endDate);
    } else {
      return "0";
    }
  };

  const onSubmit = handleSubmit(async (data: any) => {});

  return (
    <>
      <FormComponent
        id="searchRecordForm"
        className="form-signIn"
        action={onSubmit}
      >
        <div className="container-sections-forms">
          <div className="grid gap-25">
            <div className="grid-form-2-container gap-25">
              <SelectComponent
                idInput={"idEmpleado"}
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
                idInput={"originIncapacity"}
                control={control}
                errors={errors}
                data={[]}
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
                idInput={"startDate"}
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
                idInput={"endDate"}
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
                idInput={"totalDay"}
                label={
                  <>
                    Total dias <span>*</span>
                  </>
                }
                typeInput={"text"}
                register={register}
                errors={errors}
                disabled={true}
                value={`${showDays()}`}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />

              <div className="grid-span-3-columns">
                <TextAreaComponent
                  label={"Observaciones"}
                  idInput={"observation"}
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
            action={() => navigate("../consultar")}
            className="button-clean bold"
          />
          <ButtonComponent value={"Guardar"} className="button-save big" />
        </div>
      </FormComponent>
    </>
  );
};
