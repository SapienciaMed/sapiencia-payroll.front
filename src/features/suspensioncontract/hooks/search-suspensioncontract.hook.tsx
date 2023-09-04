import React, { useRef, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DateTime } from "luxon";

import { AppContext } from "../../../common/contexts/app.context";

import {
  IContractSuspensionData,
  IFilterContractSuspension,
} from "../../../common/interfaces/payroll.interfaces";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";

import {
  InputComponent,
  TextAreaComponent,
} from "../../../common/components/Form";

import { filterSuspensionContractSchema } from "../../../common/schemas";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useListData from "../../vacation/hooks/list.hook";

const useSearchSuspensionContract = () => {
  // Context
  const { setMessage } = useContext(AppContext);

  //states
  const [showTable, setShowTable] = useState<boolean>(false);

  //refs
  const tableComponentRef = useRef(null);

  //custom hooks
  const { activeWorkerList } = useListData();

  // react router dom
  const navigate = useNavigate();

  //use form
  const resolver = useYupValidationResolver(filterSuspensionContractSchema);

  const { handleSubmit, control, formState, reset, watch, trigger } =
    useForm<IFilterContractSuspension>({
      resolver,
      defaultValues: {
        codEmployment: null,
      },
      mode: "all",
    });

  const codEmployment = watch("codEmployment");

  //functions
  const onSubmitSearchSuspensionContract = handleSubmit(async (data) => {
    setShowTable(true);
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  const showDetailSuspensionContract = (row: IContractSuspensionData) => {
    if (row) {
      return setMessage({
        title: "Detalle suspension de contrato",
        show: true,
        OkTitle: "Aceptar",
        description: (
          <div className="container-modal_description">
            <div className="grid-form-4-container gap-25">
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>Documento</>}
                value={row.employment?.worker.numberDocument}
                disabled={true}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>Nombres</>}
                disabled={true}
                value={`${row.employment?.worker.firstName} ${row.employment?.worker.secondName}`}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>Apellidos</>}
                disabled={true}
                value={`${row.employment?.worker?.surname} ${row.employment?.worker?.secondSurname}`}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                disabled={true}
                label={<>Tipo de contrato</>}
                value={row.employment?.typesContracts?.[0].name}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
            <div className="grid-form-3-container gap-25">
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>No contrato</>}
                value={row.employment?.contractNumber}
                disabled={true}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>Fecha inicio</>}
                disabled={true}
                value={`${DateTime.fromISO(
                  row.employment.startDate
                ).toLocaleString()}`}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>Fecha fin</>}
                disabled={true}
                value={`${DateTime.fromISO(
                  row.employment.endDate
                ).toLocaleString()}`}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
            <div className="grid-form-3-container gap-25">
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>Fecha inicio suspención</>}
                value={`${DateTime.fromISO(row.dateStart).toLocaleString()}`}
                disabled={true}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>Fecha fin suspención</>}
                disabled={true}
                value={`${DateTime.fromISO(row.dateEnd).toLocaleString()}`}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput={""}
                errors={""}
                typeInput={"text"}
                label={<>Nueva fecha fin suspención</>}
                disabled={true}
                value={`${DateTime.fromISO(row.newDateEnd).toLocaleString()}`}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
            <div className=" grid-span-3-columns">
              <TextAreaComponent
                idInput={""}
                value={row.observation}
                className="text-area-basic"
                classNameLabel="text-black big bold"
                label="Observaciones"
                disabled={true}
                rows={5}
              />
              <div className="text-right">
                <span className="text-span ">Max. {500} carácteres</span>
              </div>
            </div>
          </div>
        ),
        size: "extra-large",
        background: true,
      });
    } else {
      return;
    }
  };

  const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setShowTable(false);
  };

  const redirectCreate = async () => {
    if (!codEmployment) {
      await trigger("codEmployment");
      return;
    }

    navigate(`../crear/${codEmployment}`);
  };

  //variables
  // const tableColumns: ITableElement<any>[] = [
  const tableColumns: ITableElement<IContractSuspensionData>[] = [
    {
      fieldName: "",
      header: "Número de documento",
      renderCell: (row) => {
        return <>{row.employment.worker.numberDocument}</>;
      },
    },
    {
      fieldName: "",
      header: "Nombres",
      renderCell: (row) => {
        return (
          <>
            {row.employment.worker.firstName} {row.employment.worker.secondName}
          </>
        );
      },
    },
    {
      fieldName: "",
      header: "Apellidos",
      renderCell: (row) => {
        return (
          <>
            {row.employment.worker.surname}{" "}
            {row.employment.worker.secondSurname}
          </>
        );
      },
    },
    {
      fieldName: "",
      header: "Tipo contrato",
      renderCell: (row) => {
        return <>{row.employment?.typesContracts?.[0].name}</>;
      },
    },
    {
      fieldName: "",
      header: "Estado",
      renderCell: (row) => {
        return <>{row.employment.state !== "0" ? "Activo" : "Inactivo"}</>;
      },
    },
  ];

  const tableActions: ITableAction<IContractSuspensionData>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        showDetailSuspensionContract(row);
      },
    },
  ];

  return {
    control,
    formState,
    onSubmitSearchSuspensionContract,
    clearFields,
    redirectCreate,
    tableComponentRef,
    activeWorkerList,
    codEmployment,
    showTable,
    tableColumns,
    tableActions,
  };
};

export default useSearchSuspensionContract;
