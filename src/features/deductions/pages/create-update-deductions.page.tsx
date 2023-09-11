import React from "react";

import { CreateUpdateDeductionsForm } from "../forms/create-update-deductions.form";
import useCreateAndUpdateDeductions from "../hooks/createAndUpdateDeductions";

interface IPropsCreateUpdateDeductions {
  action: string;
}

let render = 0;

const CreateUpdateDeductionsPage = ({
  action,
}: IPropsCreateUpdateDeductions): React.JSX.Element => {
  render++;

  const {
    control,
    formState,
    typeDeduction,
    porcentualValue,
    activeWorkerList,
    typeDeductionList,
    deductionsTypeByTypeList,
    lastPeriodsList,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitDeduction,
  } = useCreateAndUpdateDeductions({ action });

  return (
    <>
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black biggest bold">
              {renderTitleDeduction()}
            </label>
          </div>

          <CreateUpdateDeductionsForm
            control={control}
            formState={formState}
            typeDeduction={typeDeduction}
            porcentualValue={porcentualValue}
            activeWorkerList={activeWorkerList}
            typeDeductionList={typeDeductionList}
            deductionsTypeByTypeList={deductionsTypeByTypeList}
            lastPeriodsList={lastPeriodsList}
            redirectCancel={redirectCancel}
            handleSubmitDeduction={handleSubmitDeduction}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(CreateUpdateDeductionsPage);
