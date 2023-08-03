import React from "react";
import { CreateUpdateIncapacityForm } from "../forms/create-update-incapacity.form";

interface IPropsCreateAndUpdateIncapacity {
  action: string;
}

const CreateAndUpdateIncapacityPage = ({
  action,
}: IPropsCreateAndUpdateIncapacity) => {
  const renderTitleAction = () => {
    if (action !== "new") return "Editar incapacidad";
    else return "Crear incapacidad";
  };

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black biggest bold">
            {renderTitleAction()}
          </label>
        </div>
        <div>
          <CreateUpdateIncapacityForm action={action} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CreateAndUpdateIncapacityPage);
