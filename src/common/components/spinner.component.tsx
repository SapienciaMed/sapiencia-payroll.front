import React, { useContext, useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppContext } from "../contexts/app.context";
import useOnClickOutside from "../hooks/click-outside.hook";

const SpinnerComponent = (): React.JSX.Element => {
  const { spinner, setSpinner } = useContext(AppContext);
  const spinnerRef = useRef(null);
  const handleClickOutsideFn = () => {
    setSpinner((prev) => ({ ...prev, active: false }));
  };
  useOnClickOutside(spinnerRef, handleClickOutsideFn);
  return (
    <div className={`p-spinner ${spinner.active ? "p-spinner-active" : ""}`}>
      <div className={`${spinner.active ? "p-spinner-active" : ""}`} ref={spinnerRef}>
        <ProgressSpinner
          animationDuration={spinner.duration}
          color={spinner.color}
          fill={spinner.fill ?? "transparent"}
          className={spinner.className}
          pt={{
            circle: { style: { stroke: "#533893", animation: "none" } },
          }}
          style={
            spinner.active
              ? {
                  width: "10em",
                  height: "10em",
                  display: "block",
                }
              : { display: "none" }
          }
        />
      </div>
    </div>
  );
};
export default React.memo(SpinnerComponent);
