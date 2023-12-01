import React from "react";
import useReport from "../hooks/report.hook";
import { ReportForm } from "../forms/report.form";

interface IPropsReportPage {}

const ReportPage = ({}: IPropsReportPage): React.JSX.Element => {
  const {
    control,
    formState,
    workerList,
    activeContractorsList,
    inactiveWorkerList,
    periodsListBiweeklyAuthorized,
    typeReport,
    periodVacation,
    handleSubmitOtherIncome,
    handleDisabledPeriod,
    redirectCancel,
    handleDisabledEmployment,
    clearFields,
    validateActionAccess,
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
          activeContractorsList={activeContractorsList}
          inactiveWorkerList={inactiveWorkerList}
          clearFields={clearFields}
          periodsListBiweeklyAuthorized={periodsListBiweeklyAuthorized}
          typeReport={typeReport}
          handleDisabledEmployment={handleDisabledEmployment}
          handleDisabledPeriod={handleDisabledPeriod}
          // redirectCancel={redirectCancel}
          vacationPeriods={periodVacation}
          handleSubmitOtherIncome={handleSubmitOtherIncome}
          validateActionAccess={validateActionAccess}
        />
      </div>
    </div>
  );
};

export default React.memo(ReportPage);
