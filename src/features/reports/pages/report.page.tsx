import React from "react";
import useReport from "../hooks/report.hook";
import { ReportForm } from "../forms/report.form";

interface IPropsReportPage {}

const ReportPage = ({}: IPropsReportPage): React.JSX.Element => {
  const {
    control,
    formState,
    activeWorkerList,
    periodsList,
    handleSubmitOtherIncome,
    redirectCancel,
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
          activeWorkerList={activeWorkerList}
          // periodsList={periodsList}
          // redirectCancel={redirectCancel}
          handleSubmitOtherIncome={handleSubmitOtherIncome}
        />
      </div>
    </div>
  );
};

export default React.memo(ReportPage);
