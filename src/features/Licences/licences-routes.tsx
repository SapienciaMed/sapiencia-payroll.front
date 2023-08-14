import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function LicencesRoutes() {
  const CreationLicencePage = lazy(
    () => import("./pages/create-licence.page")
  );

  const SearchLicencePage = lazy(
    () => import("./pages/search-licence.page")
  );

  return (
    <Routes>
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreationLicencePage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchLicencePage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(LicencesRoutes);
