import React, { useContext, useEffect, useRef } from "react";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import {
  SelectComponent,
  InputComponent,
} from "../../../common/components/Form";

import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import TableComponent from "../../../common/components/table.component";
import { AppContext } from "../../../common/contexts/app.context";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import {
  IEmployment,
  IVinculation,
} from "../../../common/interfaces/payroll.interfaces";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { useParams } from "react-router";
import {
  calculateDifferenceYear,
  formaterNumberToCurrency,
} from "../../../common/utils/helpers";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";
import { InputEditorComponent } from "../../../common/components/Form/input-editor.component";

interface IContractualInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  setValueRegister: UseFormSetValue<any>;
  list: any[][];
  action: string;
  // changedData: number;
  getValueRegister: UseFormGetValues<IVinculation>;
  watch?: UseFormWatch<IVinculation>;
}

const ContractualInformationForm = ({
  register,
  errors,
  control,
  list,
  action,
  watch,
}: IContractualInformationProp) => {
  const tableComponentRef = useRef(null);
  const { id } = useParams();

  const { setDisabledFields, disabledFields } = useContext(AppContext);

  setDisabledFields(action == "new" ? false : true);

  const { setMessage } = useContext(AppContext);

  const [startDate, endDate] = watch([
    "employment.startDate",
    "employment.endDate",
  ]);

  return (
    <div>
      <div className="grid-form-4-container gap-25 container-sections-forms ">
        <span className="text-black large bold grid-span-4-columns">
          Información contractual
        </span>
        <SelectComponent
          idInput={"employment.idTypeContract"}
          control={control}
          errors={errors}
          data={list[0]}
          label={
            <>
              Tipo de vinculacion <span>*</span>
            </>
          }
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          // disabled={disabledFields}
        />
        <InputComponent
          idInput="employment.contractNumber"
          typeInput="text"
          label={
            <>
              Nro de contrato / resolución <span>*</span>
            </>
          }
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
          // disabled={disabledFields}
        />
        <SelectComponent
          idInput={"employment.state"}
          control={control}
          errors={errors}
          data={list[2]}
          label={
            <>
              Estado <span>*</span>
            </>
          }
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          // disabled={disabledFields}
        />

        <SelectComponent
          idInput={"employment.codDependence"}
          control={control}
          errors={errors}
          data={list[3]}
          label={
            <>
              Dependencia <span>*</span>
            </>
          }
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          // disabled={disabledFields}
        />

        <SelectComponent
          idInput={"employment.idCharge"}
          control={control}
          errors={errors}
          data={list[1]}
          label={
            <>
              Cargo <span>*</span>
            </>
          }
          className="select-basic medium"
          classNameLabel="text-black big bold"
          placeholder="Seleccione."
          // disabled={disabledFields}
        />
        <DatePickerComponent
          idInput={"employment.startDate"}
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
          idInput={"employment.endDate"}
          control={control}
          label={
            <>
              Fecha de terminación{" "}
              {String(watch("employment.idTypeContract")) === "4" ? (
                <span>*</span>
              ) : (
                ""
              )}
            </>
          }
          errors={errors}
          classNameLabel="text-black big bold"
          className="dataPicker-basic  medium "
          // disabled={
          //   String(watch("employment.idTypeContract")) === "4"
          //     ? disabledFields
          //     : true
          // }
          placeholder="DD/MM/YYYY"
          dateFormat="dd/mm/yy"
          minDate={new Date(startDate)}
        />
        {action !== "new" ? (
          <InputComponent
            idInput="antiquity"
            typeInput="text"
            label="Antiguedad"
            errors={errors}
            value={`${
              startDate && endDate
                ? calculateDifferenceYear(startDate, endDate)
                : "0"
            }
  `}
            classNameLabel="text-black big bold"
            className="input-basic medium"
            disabled={true}
          />
        ) : (
          <></>
        )}

        <InputComponent
          idInput="employment.institutionalMail"
          typeInput="email"
          label={
            <>
              Correo institucional <span>*</span>
            </>
          }
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
          // disabled={disabledFields}
        />

        <InputNumberComponent
          idInput="employment.salary"
          control={control}
          label={<>Valor mensual</>}
          errors={errors}
          classNameLabel="text-black big bold"
          className="inputNumber-basic medium"
          disabled={true}
          mode="currency"
          currency="COP"
          locale="es-CO"
          minFractionDigits={2}
          maxFractionDigits={2}
        />

        {String(watch("employment.idTypeContract")) === "4" && (
          <InputNumberComponent
            idInput="employment.totalValue"
            control={control}
            label={<>Valor total</>}
            errors={errors}
            classNameLabel="text-black big bold"
            className="inputNumber-basic medium"
            disabled={true}
            mode="currency"
            currency="COP"
            locale="es-CO"
            minFractionDigits={2}
            maxFractionDigits={2}
          />
        )}

        <div className="grid-span-4-columns gap-25">
          <TextAreaComponent
            label={"Obligaciones especificas"}
            idInput={"employment.specificObligations"}
            // disabled={disabledFields}
            className="text-area-basic"
            classNameLabel="text-black big bold"
            register={register}
            errors={errors}
            rows={5}
          />
          <div className="text-right">
            <span className="text-span ">Max. {10000} carácteres</span>
          </div>
          {/* <InputEditorComponent
            control={control}
            label={"Obligaciones especificas"}
            idInput={"employment.specificObligations"}
            readOnly={disabledFields}
            className="inputEditor-basic height-150"
            classNameLabel="text-black big bold"
          /> */}
        </div>

        {String(watch("employment.idTypeContract")) === "4" && (
          <div className="grid-span-4-columns">
            <TextAreaComponent
              label={"Objeto contractual"}
              idInput={"employment.contractualObject"}
              // disabled={disabledFields}
              className="text-area-basic"
              classNameLabel="text-black big bold"
              register={register}
              errors={errors}
              rows={5}
            />
            <div className="text-right">
              <span className="text-span ">Max. {5000} carácteres</span>
            </div>
          </div>
        )}
      </div>
      {/* {action !== "new" ? (
        <div className="container-sections-forms">
          <TableComponent
            url={`${process.env.urlApiPayroll}/api/v1/vinculation/employment/get-paginated`}
            ref={tableComponentRef}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
          />
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default React.memo(ContractualInformationForm);
