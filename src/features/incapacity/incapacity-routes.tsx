import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function IncapacityRoutes() {
  const SearchIncapacity = lazy(() => import("./pages/search-incapacity.page"));

  const CreateAndUpdateIncapacity = lazy(
    () => import("./pages/create-update-incapacity.page")
  );

  return (
    <Routes>
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreateAndUpdateIncapacity action="new" />}
            allowedAction={"NMN_CONSULTAR_NOVEDADES"}
          />
        }
      />

      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={<CreateAndUpdateIncapacity action="edit" />}
            allowedAction={"NMN_CONSULTAR_NOVEDADES"}
          />
        }
      />

      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchIncapacity />}
            allowedAction={"NMN_CONSULTAR_NOVEDADES"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(IncapacityRoutes);
