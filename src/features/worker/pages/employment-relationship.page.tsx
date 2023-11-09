import React, { useEffect } from "react";
import FormSteps from "../../../common/components/Form/form-steps.component";
import { FormStebs } from "../../../common/interfaces/tabs-menu.interface";

import useEmployments from "../hooks/employment.hook";
import AffiliationsForm from "../forms/other-fields.form";
import ContractualInformationForm from "../forms/contractual-information.form";
import FamiliarInformationForm from "../forms/familiar-information.form";
import InformationPersonalForm from "../forms/personal-information.form";

interface IPropsEmploymentRelationShip {
  action: "new" | "edit" | "view";
}

const EmploymentRelationshipPage = ({
  action,
}: IPropsEmploymentRelationShip) => {
  const {
    typeDocumentList,
    dependencesList,
    bloodType,
    nacionality,
    genderList,
    deparmentList,
    townList,
    neighborhoodList,
    socioEconomicStatus,
    housingType,
    relationship,
    arlList,
    epsList,
    layoffList,
    pensionList,
    levelRiskList,
    typesChargesList,
    typesContracts,
    activeWorker,
    register,
    control,
    isValid,
    errors,
    trigger,
    handleSubmit,
    step,
    setStep,
    vinculation,
    handleCreateWorker,
    getValueRegister,
    handleUpdateWorker,
    watch,
    navigate,
    bankList,
    accountType,
    setValueRegister,
  } = useEmployments({ action });

  useEffect(() => {
    setStep(0);
  }, []);

  const handleNavigation = () => {
    navigate("../expedientes");
  };
  const stebs: FormStebs[] = [
    {
      titleSteb: "1. Informacion personal",
      contentStep: (
        <InformationPersonalForm
          register={register}
          errors={errors}
          control={control}
          list={[
            typeDocumentList,
            bloodType,
            genderList,
            nacionality,
            deparmentList,
            townList,
            neighborhoodList,
            socioEconomicStatus,
            housingType,
          ]}
          action={action}
        />
      ),
      position: 0,
      classContainerStep: "",
    },
    {
      titleSteb: "2. Informacion familiar",
      contentStep: (
        <FamiliarInformationForm
          action={action}
          control={control}
          setValueRegister={setValueRegister}
          list={[genderList, relationship]}
        />
      ),
      position: 1,
      classContainerStep: "",
    },
    {
      titleSteb: "3. Información contractual",
      contentStep: (
        <ContractualInformationForm
          register={register}
          errors={errors}
          control={control}
          setValueRegister={setValueRegister}
          list={[
            typesContracts,
            typesChargesList,
            activeWorker,
            dependencesList,
          ]}
          action={action}
          // changedData={changedData}
          getValueRegister={getValueRegister}
          watch={watch}
        />
      ),
      position: 2,
      classContainerStep: "",
    },
    {
      titleSteb: "4. Otros datos",
      contentStep: (
        <AffiliationsForm
          register={register}
          errors={errors}
          control={control}
          setValueRegister={setValueRegister}
          list={[
            epsList,
            pensionList,
            arlList,
            levelRiskList,
            layoffList,
            accountType,
            bankList,
          ]}
          action={action}
          // changedData={changedData}
          getValueRegister={getValueRegister}
        />
      ),
      position: 3,
      classContainerStep: "",
    },
  ];

  const stepsAmount = stebs.length - 1;

  const handleNextStep = async () => {
    const isValid = await trigger();

    if (isValid && step < stepsAmount) {
      setStep((cur) => cur + 1);
    }
  };

  const handleBackStep = async () => {
    if (step >= 0) {
      setStep((cur) => cur - 1);
    }
  };

  return (
    <FormSteps
      titleForm={"Vinculacion trabajador"}
      classFormSteb="border"
      stebs={stebs}
      register={register}
      handleSubmit={handleSubmit}
      handleNextStep={handleNextStep}
      handleBackStep={handleBackStep}
      validForm={isValid}
      stepsAmount={stepsAmount}
      actionSubmit={action === "edit" ? handleUpdateWorker : handleCreateWorker}
      action={action}
      watch={watch}
      navigate={handleNavigation}
      control={control}
    />
  );
};

export default React.memo(EmploymentRelationshipPage);
