import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function WorkerRoutes() {
  const EmploymentRelationshipPage = lazy(
    () => import("./pages/employment-relationship.page")
  );
  const EmploymentRecordsPage = lazy(
    () => import("./pages/employment-records.page")
  );

  return (
    <Routes>
      <Route
        path={"/vinculacion-laboral"}
        element={
          <PrivateRoute
            element={<EmploymentRelationshipPage action="new" />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/vinculacion-laboral"}
        element={
          <PrivateRoute
            element={<EmploymentRelationshipPage action="new" />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/expedientes/edit/:id"}
        element={
          <PrivateRoute
            element={<EmploymentRelationshipPage action="edit" />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/expedientes/view/:id"}
        element={
          <PrivateRoute
            element={<EmploymentRelationshipPage action="view" />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/expedientes"}
        element={
          <PrivateRoute
            element={<EmploymentRecordsPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(WorkerRoutes);
