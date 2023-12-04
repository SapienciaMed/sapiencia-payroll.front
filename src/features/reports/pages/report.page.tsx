import React from "react";
import useReport from "../hooks/report.hook";
import { ReportForm } from "../forms/report.form";

interface IPropsReportPage {}

const ReportPage = ({}: IPropsReportPage): React.JSX.Element => {
  const {
    control,
    formState,
    activeWorkerList,
    activeContractorsList,
    inactiveWorkerList,
    workerList,
    periodsListBiweeklyAuthorized,
    periodsListVacationAuthorized,
    typeReport,
    periodVacation,
    handleSubmitOtherIncome,
    handleDisabledEmployment,
    handleDisabledPeriod,
    clearFields,
    validateActionAccess,
  } = useReport({});

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black biggest bold">Reportes1</label>
        </div>

        <ReportForm
          control={control}
          formState={formState}
          activeWorkerList={activeWorkerList}
          activeContractorsList={activeContractorsList}
          inactiveWorkerList={inactiveWorkerList}
          workerList={workerList}
          clearFields={clearFields}
          periodsListBiweeklyAuthorized={periodsListBiweeklyAuthorized}
          periodsListVacationAuthorized={periodsListVacationAuthorized}
          typeReport={typeReport}
          vacationPeriods={periodVacation}
          handleDisabledPeriod={handleDisabledPeriod}
          handleDisabledEmployment={handleDisabledEmployment}
          handleSubmitOtherIncome={handleSubmitOtherIncome}
          validateActionAccess={validateActionAccess}
        />
      </div>
    </div>
  );
};

export default React.memo(ReportPage);
