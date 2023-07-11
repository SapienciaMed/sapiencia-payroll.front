import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function WorkerRoutes() {
  const EmploymentRelationshipPage = lazy(
    () => import("./pages/employment-relationship.page")
  );

  return (
    <Routes>
      <Route
        path={"/vinculacion-laboral"}
        element={
          <PrivateRoute
            element={<EmploymentRelationshipPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(WorkerRoutes);
