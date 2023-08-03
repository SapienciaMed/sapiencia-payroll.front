import React from "react";
import { CreateIncapacityForm } from "../forms/create-incapacity.form";

const CreateIncapacityPage = () => {
  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black biggest bold">Crear incapacidad</label>
        </div>
        <div>
          <CreateIncapacityForm />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CreateIncapacityPage);
