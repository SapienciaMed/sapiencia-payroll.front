import React from "react";

import useCreateSuspensionContract from "../hooks/create-suspensioncontract.hook";

import { CreateSuspensionContractForm } from "../forms/create-suspensioncontract.form";

const CreateSuspensionContractPage = (): React.JSX.Element => {
  const {
    register,
    control,
    formState,
    onSubmitCreateSuspensionContract,
    redirectCancel,
    maxDateSuspensionDate,
    adjustEndDate,
    dateStart,
    dateStartSuspension,
  } = useCreateSuspensionContract();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Crear suspensión de contrato
          </label>
        </div>

        <CreateSuspensionContractForm
          register={register}
          control={control}
          formState={formState}
          adjustEndDate={adjustEndDate}
          dateStart={dateStart}
          dateStartSuspension={dateStartSuspension}
          onSubmitCreateSuspensionContract={onSubmitCreateSuspensionContract}
          redirectCancel={redirectCancel}
          maxDateSuspension={maxDateSuspensionDate}
        />
      </div>
    </div>
  );
};

export default React.memo(CreateSuspensionContractPage);
