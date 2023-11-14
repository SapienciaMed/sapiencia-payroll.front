import React from "react";
import { CreateUpdateChargeForm } from "../forms/create-update-charge.form";
import useCreateOrUpdateChargeHook from "../hooks/createUpdateCharge.hook";

interface IPropsCreateUpdateChargePage {
  action: string;
}

const CreateUpdateChargePage = ({
  action,
}: IPropsCreateUpdateChargePage): React.JSX.Element => {
  const {
    control,
    formState,
    typesChargesList,
    handleSubmitCharge,
    redirectCancel,
    renderTitleDeduction,
  } = useCreateOrUpdateChargeHook({ action });

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            {renderTitleDeduction()}
          </label>
        </div>

        <CreateUpdateChargeForm
          {...{
            action,
            control,
            formState,
            typesChargesList,
            handleSubmitCharge,
            redirectCancel,
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(CreateUpdateChargePage);
