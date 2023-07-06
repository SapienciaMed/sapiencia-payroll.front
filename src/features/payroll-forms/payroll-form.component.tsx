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
import { ITabsMenuTemplate } from "../../common/interfaces/tabs-menu.interface";

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
  } = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "all",
  });

  const tabs: ITabsMenuTemplate[] = [
    {
      id: "informacion-personal",
      title: "Informacion personal",
      content: <InformationPersonalForm register={register} errors={errors} />,
    },
    {
      id: "posicion-presupuestal",
      title: "Posición presupuestal",
      content: <FamiliarInformationForm register={register} errors={errors} />,
    },
    {
      id: "proyectos",
      title: "Proyectos",
      content: (
        <ContractualInformationForm register={register} errors={errors} />
      ),
    },
    {
      id: "area-funcional",
      title: "Area funcional",
      content: <AffiliationsForm register={register} errors={errors} />,
    },
  ];

  return (
    <Fragment>
      <FormSteps
        items={tabs}
        watch={watch}
        valid={isValid}
        handle={handleSubmit}
      />
    </Fragment>
  );
};

export default PayrollForm;
