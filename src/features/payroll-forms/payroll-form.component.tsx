import React, { Fragment, useContext } from "react";
import FormSteps from "../../common/components/Form/form-steps.component";
import { useForm } from "react-hook-form";
import AffiliationsForm from "./affiliations.components";
import ContractualInformationForm from "./contractual-information.component";
import FamiliarInformationForm from "./familiar-information.component";
import InformationPersonalForm from "./personal-information.component";
import {  formsPayroll } from "../../common/schemas/user-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "../../common/contexts/app.context";

interface IItemsSteps<T> {
  id: string;
  component: React.JSX.Element
  position: number;
  title: string
}
const PayrollForm = () => {
  const {step} = useContext(AppContext)
  const currentValidationSchema = formsPayroll[step]
  const {
    register,
    formState: { errors,isValid },
    watch,
    handleSubmit
  } = useForm({ resolver:yupResolver(currentValidationSchema), 
    mode: "onChange",
    });
  const itemsf = [
    {
      id: "0",
      component: <InformationPersonalForm register={register} errors={errors} />,
      position: 0,
    },
    {
      id: "1",
      component: <FamiliarInformationForm register={register} errors={errors}/>,
      position: 1,
    },
    {
      id: "2",
      component: <ContractualInformationForm register={register} errors={errors} />,
      position: 2,
    },
    {
      id: "3",
      component: <AffiliationsForm register={register} errors={errors}/>,
      position: 3,
    },
  ];
  return (
    <Fragment>
      <FormSteps items={itemsf} watch={watch} valid={isValid} handle={handleSubmit}/>
    </Fragment>
  );
};

export default PayrollForm;
