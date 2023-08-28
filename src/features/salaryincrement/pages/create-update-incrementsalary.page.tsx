import React from "react";

import { CreateUpdateIncrementSalaryForm } from "../forms/create-update-incrementsalary.form";

import useCreateUpdateIncrementSalary from "../hooks/createUpdateIncrementSalary.hook";

const CreateUpdateIncrementSalary = (): React.JSX.Element => {
  const {
    register,
    control,
    formState,
    onSubmit,
    redirectCancel,
    charges,
    porcentaje,
    idCharge,
  } = useCreateUpdateIncrementSalary();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Crear incremento de salario
          </label>
        </div>

        <CreateUpdateIncrementSalaryForm
          register={register}
          control={control}
          formState={formState}
          onSubmit={onSubmit}
          redirectCancel={redirectCancel}
          chargesState={charges}
          percentageValue={porcentaje}
          idChargeValue={idCharge}
        />
      </div>
    </div>
  );
};

export default React.memo(CreateUpdateIncrementSalary);
