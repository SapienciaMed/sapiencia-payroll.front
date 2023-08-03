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
import useAppCominicator from "./common/hooks/app-communicator.hook";

function App() {
  const { publish } = useAppCominicator();
  const HomePage = lazy(() => import("./common/components/home.page"));

  // Effect que comunica la aplicacion actual
  useEffect(() => {
    publish("currentAplication", process.env.aplicationId);
  }, []);


  return (
    <AppContextProvider>
      <ModalMessageComponent />
      <ApplicationProvider>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path={"/nomina/"} element={<HomePage />} />;
              <Route path={"/nomina/trabajadores/*"} element={<WorkerRoutes />} />
              <Route path={"/nomina/vacaciones/*"} element={<VacationRoutes />} />
            </Routes>
          </Suspense>
        </Router>
      </ApplicationProvider>
    </AppContextProvider>
  );
}

export default React.memo(App);
