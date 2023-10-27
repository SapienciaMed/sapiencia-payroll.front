import React from "react";
import { CreateUpdateOtherIncomeForm } from "../forms/create-update-otherIncome.form";
import useCreateAndUpdateOtherIncome from "../hooks/createAndUpdateOtherIncome.hook";

interface IPropsCreateUpdateOtherIncomePage {
  action: string;
}

const CreateUpdateOtherIncomePage = ({
  action,
}: IPropsCreateUpdateOtherIncomePage): React.JSX.Element => {
  const {
    activeWorkerList,
    typeIncomeByTypeList,
    periodsList,
    formState,
    control,
    statesOtherIncomeList,
    validateStateField,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitOtherIncome,
  } = useCreateAndUpdateOtherIncome({ action });

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black biggest bold">
            {renderTitleDeduction()}
          </label>
        </div>

        <CreateUpdateOtherIncomeForm
          action={action}
          control={control}
          formState={formState}
          activeWorkerList={activeWorkerList}
          periodsList={periodsList}
          typeIncomeByTypeList={typeIncomeByTypeList}
          statesOtherIncomeList={statesOtherIncomeList}
          validateStateField={validateStateField}
          redirectCancel={redirectCancel}
          handleSubmitOtherIncome={handleSubmitOtherIncome}
        />
      </div>
    </div>
  );
};

export default React.memo(CreateUpdateOtherIncomePage);
