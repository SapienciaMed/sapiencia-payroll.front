import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function SalaryIncrementRoutes() {
  const SearchIncrementSalary = lazy(
    () => import("./pages/search-incrementsalary.page")
  );

  const CreateUpdateIncrementSalary = lazy(
    () => import("./pages/create-update-incrementsalary.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchIncrementSalary />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />

      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreateUpdateIncrementSalary />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(SalaryIncrementRoutes);
