import React from "react";

import { CreateUpdateIncrementSalaryForm } from "../forms/create-update-incrementsalary.form";

import useCreateUpdateIncrementSalary from "../hooks/createUpdateIncrementSalary.hook";

interface IPropsCreateUpdateIncrementSalary {
  action: string;
}

const CreateUpdateIncrementSalary = ({
  action,
}: IPropsCreateUpdateIncrementSalary): React.JSX.Element => {
  const {
    register,
    control,
    formState,
    onSubmit,
    redirectCancel,
    charges,
    porcentualIncrement,
    codCharge,
  } = useCreateUpdateIncrementSalary(action);

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            {action === "edit"
              ? "Editar incremento de salario"
              : "Crear incremento de salario"}
          </label>
        </div>

        <CreateUpdateIncrementSalaryForm
          register={register}
          control={control}
          formState={formState}
          onSubmit={onSubmit}
          redirectCancel={redirectCancel}
          chargesState={charges}
          percentageValue={porcentualIncrement}
          idChargeValue={codCharge}
          action={action}
        />
      </div>
    </div>
  );
};

export default React.memo(CreateUpdateIncrementSalary);
