import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function VacationRoutes() {
  const CreationVacationPage = lazy(
    () => import("./pages/create-vacation.page")
  );
  const SearchVacationPage = lazy(() => import("./pages/search-vacation.page"));
  const EditVacationPage = lazy(() => import("./pages/edit-vacation.page"));

  return (
    <Routes>
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreationVacationPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchVacationPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/editar/:id/:period"}
        element={
          <PrivateRoute
            element={<EditVacationPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(VacationRoutes);
