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

  // const handleModal = (data: IEmployment) => {
  //   setMessage({
  //     title: "Información contractual",
  //     description: (
  //       <div className="grid-form-4-container gap-25 p-3em">
  //         <InputComponent
  //           idInput={"vinculationType"}
  //           typeInput={"text"}
  //           label={"Tipo de vinculación"}
  //           className="input-basic medium"
  //           classNameLabel="text-black big bold"
  //           value={data.typesContracts[0].name}
  //           disabled={disabledFields}
  //         />
  //         <InputNumberComponent
  //           idInput="employment.salary"
  //           control={control}
  //           label={<>Salario</>}
  //           errors={errors}
  //           classNameLabel="text-black big bold"
  //           className="inputNumber-basic medium"
  //           disabled={disabledFields}
  //           mode="currency"
  //           currency="COP"
  //           locale="es-CO"
  //           minFractionDigits={2}
  //           maxFractionDigits={2}
  //         />
  //         <InputComponent
  //           idInput={"status"}
  //           typeInput={"text"}
  //           label={"Estado"}
  //           className="input-basic medium"
  //           classNameLabel="text-black big bold"
  //           value={data.state == "1" ? "Activo" : "Inactivo"}
  //           disabled={disabledFields}
  //         />
  //         <InputComponent
  //           idInput={"charge"}
  //           typeInput={"text"}
  //           label={"Cargo"}
  //           className="input-basic medium"
  //           classNameLabel="text-black big bold"
  //           value={data.charges[0].name}
  //           disabled={disabledFields}
  //         />
  //         <InputComponent
  //           idInput={"startDate"}
  //           typeInput={"text"}
  //           label={"Fecha de inicio"}
  //           className="input-basic medium"
  //           classNameLabel="text-black big bold"
  //           value={`${data.startDate}`}
  //           disabled={disabledFields}
  //         />
  //         <InputComponent
  //           idInput={"endDate"}
  //           typeInput={"text"}
  //           label={"Fecha de fin"}
  //           className="input-basic medium"
  //           classNameLabel="text-black big bold"
  //           value={`${data.endDate}`}
  //           disabled={disabledFields}
  //         />
  //         <InputComponent
  //           idInput={"antiquity"}
  //           typeInput={"text"}
  //           label={"Antigüedad"}
  //           className="input-basic medium"
  //           classNameLabel="text-black big bold"
  //           value={`${calculateDifferenceYear(data.startDate, data.endDate)}`}
  //           disabled={true}
  //         />
  //         <InputComponent
  //           idInput={"instutionalMail"}
  //           typeInput={"text"}
  //           label={"Correo institucional"}
  //           className="input-basic medium"
  //           classNameLabel="text-black big bold"
  //           value={data.institutionalMail}
  //           disabled={disabledFields}
  //         />
  //         <div className="grid-span-4-columns">
  //           <TextAreaComponent
  //             label={"Observaciones"}
  //             idInput={"observation"}
  //             // value={data.observation}
  //             className="text-area-basic"
  //             classNameLabel="text-black big bold"
  //             disabled={disabledFields}
  //             rows={5}
  //           />
  //         </div>
  //       </div>
  //     ),
  //     show: true,
  //     OkTitle: "Aceptar",
  //     onClose: () => {
  //       setMessage({});
  //     },
  //     background: true,
  //     size: "medium",
  //   });
  // };
  // const tableColumns: ITableElement<IEmployment>[] = [
  //   {
  //     fieldName: "idTypeContract",
  //     header: "Tipo de vinculación",
  //     renderCell: (row) => {
  //       return <>{row.typesContracts[0].name}</>;
  //     },
  //   },
  //   {
  //     fieldName: "salary",
  //     header: "Salario",
  //     renderCell: (row) => {
  //       return <>{formaterNumberToCurrency(1000)}</>;
  //     },
  //   },
  //   {
  //     fieldName: "idCharge",
  //     header: "Cargo",
  //     renderCell: (row) => {
  //       return <>{row.charges[0].name}</>;
  //     },
  //   },
  //   {
  //     fieldName: "startDate",
  //     header: "Fecha inicio",
  //     renderCell: (row) => {
  //       return <>{row.startDate}</>;
  //     },
  //   },
  //   {
  //     fieldName: "endDate",
  //     header: "Fecha fin",
  //     renderCell: (row) => {
  //       return <>{row.endDate}</>;
  //     },
  //   },
  // ];
  // const tableActions: ITableAction<IEmployment>[] = [
  //   {
  //     icon: "Detail",
  //     onClick: (row) => {
  //       handleModal(row);
  //     },
  //   },
  // ];

  // function loadTableData(searchCriteria?: object): void {
  //   if (tableComponentRef.current) {
  //     tableComponentRef.current.loadData(searchCriteria);
  //   }
  // }
  // useEffect(() => {
  //   loadTableData({ workerId: id });
  // }, []);

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
          disabled={disabledFields}
        />
        <InputComponent
          idInput="employment.contractNumber"
          typeInput="text"
          label={
            <>
              Nro de contrato <span>*</span>
            </>
          }
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
          disabled={disabledFields}
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
          disabled={disabledFields}
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
          disabled={disabledFields}
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
          disabled={disabledFields}
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
          disabled={disabledFields}
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
          disabled={disabledFields}
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
          disabled={disabledFields}
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
            disabled={disabledFields}
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
            disabled={disabledFields}
            className="text-area-basic"
            classNameLabel="text-black big bold"
            register={register}
            errors={errors}
            rows={5}
          />
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
              disabled={disabledFields}
              className="text-area-basic"
              classNameLabel="text-black big bold"
              register={register}
              errors={errors}
              rows={5}
            />
            <div className="text-right">
              <span className="text-span ">Max. {500} carácteres</span>
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
