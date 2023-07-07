import React, { Fragment, useContext } from "react";
import FormSteps from "../../common/components/Form/form-steps.component";
import { useForm, Controller } from "react-hook-form";
import AffiliationsForm from "./affiliations.components";
import ContractualInformationForm from "./contractual-information.component";
import FamiliarInformationForm from "./familiar-information.component";
import InformationPersonalForm from "./personal-information.component";
import { formsPayroll } from "../../common/schemas/employment-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "../../common/contexts/app.context";
import {
  FormStebs,
  ITabsMenuTemplate,
} from "../../common/interfaces/tabs-menu.interface";

interface IItemsSteps<T> {
  id: string;
  component: React.JSX.Element;
  position: number;
  title: string;
}
const PayrollForm = () => {
  const { step } = useContext(AppContext);

  const currentValidationSchema = formsPayroll[step];
  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    trigger,
  } = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "all",
  });

  const stebs: FormStebs[] = [
    {
      titleSteb: "1. Informacion personal",
      contentStep: (
        <InformationPersonalForm register={register} errors={errors} />
      ),
      position: 0,
      classContainerStep: "",
    },
    {
      titleSteb: "2. Informacion familiar",
      contentStep: (
        <FamiliarInformationForm register={register} errors={errors} />
      ),
      position: 1,
      classContainerStep: "",
    },
  ];

  // const :  [
  //   {
  //     id: "informacion-personal",
  //     titleTab: "1. Informacion personal",
  //     contentTab: <InformationPersonalForm register={register} errors={errors} />,
  //   },
  //   {
  //     id: "posicion-presupuestal",
  //     title: "2. Posición presupuestal",
  //     content: <FamiliarInformationForm register={register} errors={errors} />,
  //   },
  //   {
  //     id: "proyectos",
  //     title: "3. Proyectos",
  //     content: (
  //       <ContractualInformationForm register={register} errors={errors} />
  //     ),
  //   },
  //   {
  //     id: "area-funcional",
  //     title: "4. Area funcional",
  //     content: <AffiliationsForm register={register} errors={errors} />,
  //   },
  // ];

  return (
    <>
      <FormSteps
        titleForm={"Vinculacion trabajador"}
        classFormSteb="border"
        stebs={stebs}
        triggerValidate={trigger}
        handleSubmit={handleSubmit}
        validForm={isValid}
      />
    </>
  );
};

export default PayrollForm;
