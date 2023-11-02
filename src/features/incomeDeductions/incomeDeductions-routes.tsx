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
            allowedAction={"CREAR_DEDUCCION_RENTA"}
          />
        }
      />
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchIncomeDeductionsPage />}
            allowedAction={"CONSULTAR_DEDUCCION_RENTA"}
          />
        }
      />
      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={<CreateUpdateIncomeDeductionPage action="edit" />}
            allowedAction={"EDITAR_DEDUCCION_RENTA"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(IncomeDeductions);
