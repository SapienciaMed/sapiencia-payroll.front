import React from "react";

import useCreateOrUpdateSpreadSheetHook from "../hooks/createUpdateSpreadSheet.hook";

import { CreateUpdateSpreadSheetForm } from "../forms/create-update-spreadsheet.form";

interface IPropsCreateUpdateSpreadSheetPage {
  action: string;
}

const CreateUpdateSpreadSheetPage = ({
  action,
}: IPropsCreateUpdateSpreadSheetPage): React.JSX.Element => {
  const {
    control,
    formState,
    typesSpreadSheetList,
    monthList,
    handleSubmitSpreadSheet,
    redirectCancel,
    renderTitleDeduction,
  } = useCreateOrUpdateSpreadSheetHook({ action });

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            {renderTitleDeduction()}
          </label>
        </div>

        <CreateUpdateSpreadSheetForm
          {...{
            action,
            control,
            formState,
            typesSpreadSheetList,
            monthList,
            handleSubmitSpreadSheet,
            redirectCancel,
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(CreateUpdateSpreadSheetPage);
