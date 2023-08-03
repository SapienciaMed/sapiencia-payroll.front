import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./common/contexts/app.context";
import "./styles/_app.scss";
import "./styles/_theme-prime.css";
import "primereact/resources/primereact.min.css";
import ModalMessageComponent from "./common/components/modal-message.component";
import ApplicationProvider from "./application-provider";
import WorkerRoutes from "./features/worker/worker-routes";
import VacationRoutes from "./features/vacation/vacation-routes";
import IncapacityRoutes from "./features/incapacity/incapacity-routes";

function App() {
  const HomePage = lazy(() => import("./common/components/home.page"));

  return (
    <AppContextProvider>
      <ModalMessageComponent />
      <ApplicationProvider>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path={"/nomina/"} element={<HomePage />} />;
              <Route
                path={"/nomina/trabajadores/*"}
                element={<WorkerRoutes />}
              />
              <Route
                path={"/nomina/vacaciones/*"}
                element={<VacationRoutes />}
              />
              <Route
                path={"/nomina/incapacidades/*"}
                element={<IncapacityRoutes />}
              />
            </Routes>
          </Suspense>
        </Router>
      </ApplicationProvider>
    </AppContextProvider>
  );
}

export default React.memo(App);
