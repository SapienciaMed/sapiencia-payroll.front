import React from "react";
import useReport from "../hooks/report.hook";
import { ReportForm } from "../forms/report.form";

interface IPropsReportPage {}

const ReportPage = ({}: IPropsReportPage): React.JSX.Element => {
  const {
    control,
    formState,
    workerList,
    periodsListBiweeklyAuthorized,
    typeReport,
    handleSubmitOtherIncome,
    redirectCancel,
    handleDisabledEmployment,
    clearFields,
  } = useReport({});

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black biggest bold">Reportes</label>
        </div>

        <ReportForm
          control={control}
          formState={formState}
          activeWorkerList={workerList}
          clearFields={clearFields}
          periodsListBiweeklyAuthorized={periodsListBiweeklyAuthorized}
          typeReport={typeReport}
          handleDisabledEmployment={handleDisabledEmployment}
          // redirectCancel={redirectCancel}
          handleSubmitOtherIncome={handleSubmitOtherIncome}
        />
      </div>
    </div>
  );
};

export default React.memo(ReportPage);
