import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function OtherIncomeRoutes() {
  const CreateUpdateOtherIncome = lazy(
    () => import("./pages/create-update-otherIncome.page")
  );

  const SearchOtherIncomePage = lazy(
    () => import("./pages/search-otherIncome.page")
  );

  return (
    <Routes>
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreateUpdateOtherIncome action={"new"} />}
            allowedAction={"CREAR_OTROS_INGRESOS"}
          />
        }
      />
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchOtherIncomePage />}
            allowedAction={"CONSULTAR_OTROS_INGRESOS"}
          />
        }
      />

      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={<CreateUpdateOtherIncome action={"edit"} />}
            allowedAction={"EDITAR_OTROS_INGRESOS"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(OtherIncomeRoutes);
