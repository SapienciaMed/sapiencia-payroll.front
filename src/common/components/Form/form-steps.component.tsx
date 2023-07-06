import React, { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import TabListComponent from "../tab-list.component";

const FinishSectionButton: React.FC<{
  onClick: () => void;
  isDisabled: boolean;
}> = ({ onClick, isDisabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      className="mt-6 bg-green-500 text-white rounded py-6 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

const FormSteps = ({ items, valid, watch, handle }) => {
  const { step, setStep } = useContext(AppContext);

  const STEPS_AMOUNT = items.length - 1;

  const handleStepCompletion = (): void => {
    setStep((cur) => cur + 1);
  };

  const handleGoBackToPreviousStep = () => {
    setStep((cur) => cur - 1);
  };

  const onSubmit = (values): void => {
    console.log(JSON.stringify(values, null, 2));
    //handleStepCompletion();
  };

  return (
    <>
      <form onSubmit={handle(onSubmit)}>
        <TabListComponent
          tabs={items}
          index={step >= STEPS_AMOUNT ? STEPS_AMOUNT : step}
        />
        <FinishSectionButton onClick={handleStepCompletion} isDisabled={!valid}>
          {step >= STEPS_AMOUNT ? "Enviar" : "Siguiente"}
        </FinishSectionButton>
        {/* <div className="tabs-component">
          <div className="tabs-selection">
            {items.map((item) => {
              return <div key={item}>{item.tab} </div>;
            })}
          </div>
        </div>

        {items.map((item) => {
          if (formStep == item.position) {
            return (
              <section key={item.id}>
                {item.component}
       
              </section>
            );
          }
        })} */}
        <p>{valid ? "Valid" : "Invalid"}</p>
        <pre className="">{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </>
  );
};

export default FormSteps;
