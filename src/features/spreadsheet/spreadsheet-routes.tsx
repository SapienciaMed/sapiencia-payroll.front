import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function SpreadsSheetRoutes() {
  const SearchSpreedSheetPage = lazy(
    () => import("./pages/search-spreadsheet.page")
  );

  const CreateUpdateSpreadSheetPage = lazy(
    () => import("./pages/create-update-spreadsheet.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchSpreedSheetPage />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />

      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreateUpdateSpreadSheetPage action={"new"} />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />

      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={<CreateUpdateSpreadSheetPage action={"edit"} />}
            allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(SpreadsSheetRoutes);
