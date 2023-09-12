import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function DeductionsRoutes() {
  const SearchDeductionsPage = lazy(
    () => import("./pages/search-deductions.page")
  );
  
  const CreateUpdateDeductionsPage = lazy(
    () => import("./pages/create-update-deductions.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchDeductionsPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreateUpdateDeductionsPage action="new" />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={<CreateUpdateDeductionsPage action="edit" />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(DeductionsRoutes);
