import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import { ButtonComponent } from "./button.component";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormTrigger,
} from "react-hook-form";
import { FormStebs } from "../../interfaces/tabs-menu.interface";

interface IFormStepsProp {
  titleForm: string;
  stebs: FormStebs[];
  triggerValidate: UseFormTrigger<FieldValues>;
  classFormSteb?: string;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  validForm: boolean;
}

const FormSteps = ({
  stebs,
  triggerValidate,
  classFormSteb,
  titleForm,
  handleSubmit,
  validForm,
}: IFormStepsProp) => {
  const { step, setStep } = useContext(AppContext);

  const STEPS_AMOUNT = stebs.length - 1;

  const handleNextStep = async () => {
    const isValid = await triggerValidate();

    if (isValid && step < STEPS_AMOUNT) {
      setStep((cur) => cur + 1);
      return;
    }
  };

  const handleBackStep = () => {
    if (step >= 0) {
      setStep((cur) => cur - 1);
    }
  };

  const onSubmit = handleSubmit((values): void => {
    console.log(values);
  });

  return (
    <>
      <form
        className={`form-steps ${classFormSteb}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>{titleForm}</h1>
        <div className="stebs-selection">
          {stebs.map((infoSteb: FormStebs) => {
            return (
              <div key={infoSteb.position}>
                <div
                  className={`steb-option ${
                    infoSteb.position === step || step > infoSteb.position
                      ? "active"
                      : ""
                  }`}
                >
                  {infoSteb.titleSteb}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {stebs.map((infoStep: FormStebs) => {
            if (infoStep.position === step) {
              return (
                <div
                  className={infoStep.classContainerStep}
                  key={infoStep.position}
                >
                  {step === infoStep.position && infoStep.contentStep}

                  <div className="container-actions_formTabs">
                    {step !== 0 && step === infoStep.position && (
                      <ButtonComponent
                        value={"Anterior"}
                        className={`${"button-tab_save hover-three big"}`}
                        action={handleBackStep}
                      />
                    )}
                    {step === infoStep.position && (
                      <ButtonComponent
                        value={step === STEPS_AMOUNT ? "Guardar" : "Siguiente"}
                        className={`${
                          validForm
                            ? "button-tab_save hover-three big"
                            : "button-tab_save invalid big"
                        }`}
                        type={step === STEPS_AMOUNT ? "submit" : "button"}
                        action={handleNextStep}
                      />
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* {stebs.} */}
        {/* <TabListComponent
            tabs={items}
            index={step >= STEPS_AMOUNT ? STEPS_AMOUNT : step}
            classTabContent={classTabContent}
            childrenInContent={actionsForm}
          />
        {/* <p>{valid ? "Valid" : "Invalid"}</p>
        <pre className="">{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </>
  );
};

export default FormSteps;
