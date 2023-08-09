import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function WithDrawalRoutes() {
  return (
    <Routes>
      <Route
        path={"/personal"}
        element={
          <PrivateRoute
            element={
              <>
                <h1>Retiro personal</h1>
              </>
            }
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(WithDrawalRoutes);
