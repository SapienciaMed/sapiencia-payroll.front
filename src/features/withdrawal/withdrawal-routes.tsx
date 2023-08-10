import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";
import { WithDrawalStaffPage } from "./pages/withdrawal-staff.page";

function WithDrawalRoutes() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <PrivateRoute
            element={<WithDrawalStaffPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(WithDrawalRoutes);
