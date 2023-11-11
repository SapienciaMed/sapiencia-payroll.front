import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function ChargeRoutes() {
  const SearchChargePage = lazy(() => import("./pages/search-charge.page"));

  const CreateUpdateChargePage = lazy(
    () => import("./pages/create-update-charge.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchChargePage />}
            allowedAction={"CONSULTAR_CARGOS"}
          />
        }
      />
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreateUpdateChargePage action="new" />}
            allowedAction={"CREAR_CARGOS"}
          />
        }
      />
      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={<CreateUpdateChargePage action="edit" />}
            allowedAction={"EDITAR_CARGOS"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(ChargeRoutes);
