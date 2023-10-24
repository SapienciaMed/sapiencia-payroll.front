import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function IncomeDeductions() {
  const CreateUpdateIncomeDeductionPage = lazy(
    () => import("./pages/create-update-incomeDeductions.page")
  );

  const SearchIncomeDeductionsPage = lazy(
    () => import("./pages/search-incomeDeductions.page")
  );

  return (
    <Routes>
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreateUpdateIncomeDeductionPage action="new" />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchIncomeDeductionsPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={<CreateUpdateIncomeDeductionPage action="edit" />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(IncomeDeductions);
