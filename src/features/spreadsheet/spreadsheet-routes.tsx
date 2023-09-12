import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function SpreadsSheetRoutes() {
  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={
              <>
                <h1>Hola mundo</h1>
              </>
            }
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
                <h1>Hola mundo crear</h1>
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
                <h1>Hola mundo editar</h1>
              </>
            }
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(SpreadsSheetRoutes);
