import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  SelectComponent,
  InputComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import TableComponent from "../../../common/components/table.component";
import { AppContext } from "../../../common/contexts/app.context";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { DateTime } from "luxon";
import useEmploymentsData from "../hooks/employment.hook";
import {
  IEmployment,
  IVinculation,
} from "../../../common/interfaces/payroll.interfaces";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { useParams } from "react-router";
import { calculateDifference } from "../../../common/utils/helpers";

interface IContractualInformationProp {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  setValueRegister: UseFormSetValue<any>;
  list: any[][];
  action: string;
  changedData: number;
  getValueRegister: UseFormGetValues<IVinculation>;
}

const ContractualInformationForm = ({
  register,
  errors,
  control,
  setValueRegister,
  list,
  action,
  changedData,
  getValueRegister,
}: IContractualInformationProp) => {
  const tableComponentRef = useRef(null);
  const id = useParams();
  const { setDisabledFields, disabledFields } = useContext(AppContext);
  setDisabledFields(action == "new" ? false : true);
  const [antiquity, setAntiquity] = useState("0");
  const { setMessage, authorization } = useContext(AppContext);
  const handleModal = (data:IEmployment) => {
    setMessage({
      title: "Información contractual",
      description: (
        <div className="grid-form-4-container gap-25">
          <InputComponent
            idInput={"vinculationType"}
            typeInput={"text"}
            label={"Tipo de vinculación"}
            className="input-basic medium"
            classNameLabel="text-black big bold"
            value={data.typesContracts[0].name}
            disabled={true}
          />
          <InputComponent
            idInput={"salary"}
            typeInput={"text"}
            label={"Salario"}
            className="input-basic medium"
            classNameLabel="text-black big bold"
            value={`${data.salary}`}
            disabled={true}
          />
          <InputComponent
            idInput={"status"}
            typeInput={"text"}
            label={"Estado"}
            className="input-basic medium"
            classNameLabel="text-black big bold"
            value={data.state == '1' ? "Activo" : "Inactivo"}
            disabled={true}
          />
          <InputComponent
            idInput={"charge"}
            typeInput={"text"}
            label={"Cargo"}
            className="input-basic medium"
            classNameLabel="text-black big bold"
            value={data.charges[0].name}
            disabled={true}
          />
          <InputComponent
            idInput={"startDate"}
            typeInput={"text"}
            label={"Fecha de inicio"}
            className="input-basic medium"
            classNameLabel="text-black big bold"
            value={data.startDate}
            disabled={true}
          />
          <InputComponent
            idInput={"endDate"}
            typeInput={"text"}
            label={"Fecha de fin"}
            className="input-basic medium"
            classNameLabel="text-black big bold"
            value={data.endDate}
            disabled={true}
          />
          <InputComponent
            idInput={"antiquity"}
            typeInput={"text"}
            label={"Antigüedad"}
            className="input-basic medium"
            classNameLabel="text-black big bold"
            value={`${calculateDifference(data.startDate, data.endDate)}`}
            disabled={true}
          />
          <InputComponent
            idInput={"instutionalMail"}
            typeInput={"text"}
            label={"Correo institucional"}
            className="input-basic medium"
            classNameLabel="text-black big bold"
            value={data.institutionalMail}
            disabled={true}
          />
          <div className="grid-span-4-columns">
            <TextAreaComponent
              label={"Observaciones"}
              idInput={"observation"}
              value={data.observation}
              disabled={true}
              className="text-area-basic"
              classNameLabel="text-black big bold"
              rows={5}
            />
          </div>
        </div>
      ),
      show: true,
      OkTitle: "Aceptar",
      onClose: () => {
        setMessage({});
      },
      background: true,
      size:"large"
    });
  };
  const tableColumns: ITableElement<IEmployment>[] = [
    {
      fieldName: "idTypeContract",
      header: "Tipo de vinculación",
      renderCell: (row) => {
        return <>{row.typesContracts[0].name}</>;
    }
    },
    {
      fieldName: "salary",
      header: "Salario",
    },
    {
      fieldName: "idCharge",
      header: "Cargo",
      renderCell: (row) => {
        return <>{row.charges[0].name}</>;
    }
    },
    {
      fieldName: "startDate",
      header: "Fecha inicio",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row.startDate).toLocaleString()}</>;
    }
    },
    {
      fieldName: "endDate",
      header: "Fecha fin",
      renderCell: (row) => {
        return <>{DateTime.fromISO(row.endDate).toLocaleString()}</>;
    }
    },
  ];
  const tableActions: ITableAction<IEmployment>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        handleModal(row);
      },
    },
  ];

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }
  useEffect(() => {
    loadTableData(id);
  }, []);

  return (
    <div>
      <div className="grid-form-4-container gap-25 container-sections-forms ">
        <span className="text-black large bold grid-span-4-columns">
          Información contractual
        </span>
        <Controller
          name="employment.idTypeContract"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Tipo de vinculacion <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[0]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              placeholder="Seleccione"
              disabled={disabledFields}
            />
          )}
        />
        <InputComponent
          idInput="employment.contractNumber"
          typeInput="text"
          label={
            <>
              Numero de contrato <span>*</span>
            </>
          }
          register={register}
          errors={errors}
          classNameLabel="text-black big bold"
          className="input-basic medium"
          disabled={disabledFields}
        />
        <Controller
          name="employment.state"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Estado <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[2]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              placeholder="Seleccione"
              disabled={disabledFields}
            />
          )}
        />
        <Controller
          name="employment.idCharge"
          control={control}
          render={({ field }) => (
            <SelectComponent
              id={field.name}
              idInput={field.name}
              label={
                <>
                  Cargo <span>*</span>
                </>
              }
              register={register}
              errors={errors}
              data={list[1]}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              value={field.value}
              setValueRegister={setValueRegister}
              getValueRegister={getValueRegister}
              change={changedData}
              onchange={field.onChange}
              placeholder="Seleccione"
              disabled={disabledFields}
            />
          )}
        />
        <Controller
          control={control}
          name="employment.startDate"
          render={({ field }) => {
            return (
              <DatePickerComponent
                id={field.name}
                idInput={field.name}
                value={field.value}
                label={
                  <>
                    Fecha inicio de contrato <span>*</span>
                  </>
                }
                register={register}
                errors={errors}
                classNameLabel="text-black big bold"
                setValueRegister={setValueRegister}
                onchange={field.onChange}
                className="dataPicker-basic  medium "
                setValue={setAntiquity}
                maxDate={new Date()}
                disabled={disabledFields}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="employment.endDate"
          render={({ field }) => {
            return (
              <DatePickerComponent
                id={field.name}
                idInput={field.name}
                value={field.value}
                label={<>Fecha fin de contrato</>}
                register={register}
                errors={errors}
                classNameLabel="text-black big bold"
                setValueRegister={setValueRegister}
                onchange={field.onChange}
                className="dataPicker-basic  medium "
                disabled={disabledFields}
              />
            );
          }}
        />
        {action !== "new" ? (
          <InputComponent
            idInput="antiquity"
            typeInput="text"
            label="Antiguedad"
            errors={errors}
            value={antiquity ? antiquity : "0"}
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

        {false ? (
          <InputComponent
            idInput="employment.salary"
            typeInput="text"
            label={<>Salario</>}
            register={register}
            errors={errors}
            classNameLabel="text-black big bold"
            className="input-basic medium"
            disabled={disabledFields}
          />
        ) : (
          <>
            <InputComponent
              idInput="employment.totalValue"
              typeInput="text"
              label={<>Valor total</>}
              register={register}
              errors={errors}
              classNameLabel="text-black big bold"
              className="input-basic medium"
              disabled={disabledFields}
            />
            <div className="grid-span-4-columns">
              <TextAreaComponent
                label={"Observaciones"}
                idInput={"observation"}
                disabled={disabledFields}
                className="text-area-basic"
                classNameLabel="text-black big bold"
                register={register}
                errors={errors}
                rows={5}
              />
            </div>
          </>
        )}
      </div>
      {action !== "new" ? (
        <div className="container-sections-forms">
          <TableComponent
            url={`${process.env.urlApiPayroll}/api/v1/employment/employment/get-paginated`}
            ref={tableComponentRef}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(ContractualInformationForm);
