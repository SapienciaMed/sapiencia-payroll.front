import React from "react";

import useCreateAndUpdateCharge from "../hooks/createAndUpdateCharge.hook";
import { CreateUpdateChargeForm } from "../forms/create-update-charge.form";

interface IPropsCreateUpdateCharge {
  action: string;
}

const CreateUpdateChargePage = ({
  action,
}: IPropsCreateUpdateCharge): React.JSX.Element => {
  const {
    control,
    formState,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitDeduction,
  } = useCreateAndUpdateCharge({ action });

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black biggest bold">
            {renderTitleDeduction()}
          </label>
        </div>

        <CreateUpdateChargeForm
          control={control}
          formState={formState}
          action={action}
          redirectCancel={redirectCancel}
          handleSubmitDeduction={handleSubmitDeduction}
        />
      </div>
    </div>
  );
};

export default React.memo(CreateUpdateChargePage);
