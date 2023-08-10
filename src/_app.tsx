import React, { Suspense, lazy, useEffect } from "react";
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
import WithDrawalRoutes from "./features/withdrawal/withdrawal-routes";
import useAppCominicator from "./common/hooks/app-communicator.hook";

function App() {
  const { publish } = useAppCominicator();
  const HomePage = lazy(() => import("./common/components/home.page"));

  // Effect que comunica la aplicacion actual
  useEffect(() => {
    localStorage.setItem("currentAplication", process.env.aplicationId);
    setTimeout(
      () => publish("currentAplication", process.env.aplicationId),
      500
    );
  }, []);

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
              <Route path={"/nomina/retiro/*"} element={<WithDrawalRoutes />} />
            </Routes>
          </Suspense>
        </Router>
      </ApplicationProvider>
    </AppContextProvider>
  );
}

export default React.memo(App);
