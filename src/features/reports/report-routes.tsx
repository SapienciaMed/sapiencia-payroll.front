import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function ReportRoutes() {
  const ReportPage = lazy(() => import("./pages/report.page"));

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <PrivateRoute
            element={<ReportPage />}
            allowedAction={"GENERAR_REPORTES_NOMINA"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(ReportRoutes);
