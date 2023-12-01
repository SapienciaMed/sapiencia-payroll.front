import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function ReportRoutes() {
  const ReportPage = lazy(() => import("./pages/report.page"));

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <PrivateRoute
            element={<ReportPage />}
            allowedAction={
              "GENERAR_COLILLA_NOMINA" ||
              "GENERAR_CERTIFICADO_LABORAL_NOMINA" ||
              "GENERAR_CONSTANCIA_CONTRATOS_NOMINA" ||
              "GENERAR_RESOLUCION_LIQUIDACION_NOMINA" ||
              "GENERAR_CERTIFICADO_RETENCIONES_NOMINA" ||
              "GENERAR_RESOLUCION_VACACIONES_NOMINA"
            }
          />
        }
      />
    </Routes>
  );
}

export default React.memo(ReportRoutes);
