import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { InputComponent } from "./input.component";
import { AppContext } from "../../contexts/app.context";

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

const FormSteps = ({items,valid,watch,handle}) => {
  const [formStep, setFormStep] = React.useState(0);

  const {setStep} = useContext(AppContext)

  const STEPS_AMOUNT = items.length;

  const handleStepCompletion = () => {
    setFormStep((cur) => cur + 1);
    setStep((cur) => cur + 1)
  };

  const handleGoBackToPreviousStep = () => {
    setFormStep((cur) => cur - 1);
    setStep((cur) => cur - 1);
  };

  const onSubmit = (values): void => {
    console.log(JSON.stringify(values, null, 2));
    handleStepCompletion();
  };

  return (
    <div className="">
      <form onSubmit={handle(onSubmit)}>
        {items.map((item)=>{
          
        })}
        {formStep < STEPS_AMOUNT && (
          <div className="">
            {formStep > 0 && (
              <button
                onClick={handleGoBackToPreviousStep}
                type="button"
                className=""
              >
                back
              </button>
            )}
            Step {formStep + 1} of {STEPS_AMOUNT}
          </div>
        )}

        {items.map((item) => {
            console.log(item.component)
           
            if(formStep == item.position){
            return(
                <section key={item.id} className={`${formStep === item.position ? "block" : "hidden"}`}>
                    {item.component}
            <FinishSectionButton
              onClick={handleStepCompletion}
              isDisabled={!valid}
            >
              Next
            </FinishSectionButton>
          </section>
            )
            }  
        })}
        <p>{valid ? "Valid" : "Invalid"}</p>
        <pre className="">{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </div>
  );
};

export default FormSteps;
