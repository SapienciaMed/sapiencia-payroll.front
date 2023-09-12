import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function DeductionsRoutes() {
  const SearchDeductionsPage = lazy(
    () => import("./pages/search-deductions.page")
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
            element={
              <>
                <h1>Crear deducciones</h1>
              </>
            }
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={
              <>
                <h1>Editar deducciones</h1>
              </>
            }
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(DeductionsRoutes);
