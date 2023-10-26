import React from "react";

import { CreateUpdateOtherIncomeDeductionsForm } from "../forms/create-update-incomeDeductions.form";
import useCreateAndUpdateIncomeDeductions from "../hooks/createAndUpdateIncomeDeductions.hook";

interface IPropsCreateUpdateOtherIncomePage {
  action: string;
}

const CreateUpdateIncomeDeductionsPage = ({
  action,
}: IPropsCreateUpdateOtherIncomePage): React.JSX.Element => {
  const {
    activeWorkerList,
    typeTaxDeduction,
    formState,
    control,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitOtherIncome,
  } = useCreateAndUpdateIncomeDeductions({ action });

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black biggest bold">
            {renderTitleDeduction()}
          </label>
        </div>

        <CreateUpdateOtherIncomeDeductionsForm
          action={action}
          control={control}
          formState={formState}
          activeWorkerList={activeWorkerList}
          typeDeductionList={typeTaxDeduction}
          redirectCancel={redirectCancel}
          handleSubmitOtherIncome={handleSubmitOtherIncome}
        />
      </div>
    </div>
  );
};

export default React.memo(CreateUpdateIncomeDeductionsPage);
