import React, { useContext, useEffect, useState } from "react";
import FormSteps from "../../common/components/Form/form-steps.component";
import { useForm } from "react-hook-form";
import AffiliationsForm from "./affiliations.components";
import ContractualInformationForm from "./contractual-information.component";
import FamiliarInformationForm from "./familiar-information.component";
import InformationPersonalForm from "./personal-information.component";
import { formsPayroll } from "../../common/schemas/employment-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "../../common/contexts/app.context";
import useEmploymentsData from "./hooks/Employments.hook";
import { FormStebs } from "../../common/interfaces/tabs-menu.interface";
import { ICreateWorker } from "../../common/interfaces/payroll.interfaces";

const PayrollForm = () => {
  const { step, setStep } = useContext(AppContext);

  const {
    typeDocumentList,
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
    setDeparment,
    setTown,
  } = useEmploymentsData();

  const currentValidationSchema = formsPayroll[step];

  const {
    register,
    watch,
    formState: { errors, isValid },
    control,
    handleSubmit,
    trigger,
    setValue: setValueRegister,
  } = useForm<ICreateWorker>({
    defaultValues: {
      worker: {
        typeDocument: "",
        numberDocument: "",
        firstName: "",
        secondName: "",
        surName: "",
        secondSurname: "",
        gender: "",
        bloodType: "",
        birthDate: "",
        nationality: "",
        email: "",
        contactNumber: "",
        department: "",
        municipality: "",
        neighborhood: "",
        address: "",
        socioEconomic: "",
        eps: "",
        severanceFund: "",
        arl: "",
        riskLevel: "",
        housingType: "",
      },
    },
    resolver: yupResolver(currentValidationSchema),
    mode: "all",
  });

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
          stateList={[setDeparment, setTown]}
          setValueRegister={setValueRegister}
        />
      ),
      position: 0,
      classContainerStep: "",
    },
    {
      titleSteb: "2. Informacion familiar",
      contentStep: (
        <FamiliarInformationForm
          register={register}
          errors={errors}
          list={[genderList, relationship]}
        />
      ),
      position: 1,
      classContainerStep: "",
    },
    {
      titleSteb: "3. Proyectos",
      contentStep: (
        <ContractualInformationForm
          register={register}
          errors={errors}
          control={control}
          setValueRegister={setValueRegister}
          list={[typesContracts, typesChargesList]}
        />
      ),
      position: 2,
      classContainerStep: "",
    },
    {
      titleSteb: "4. Area funcional",
      contentStep: (
        <AffiliationsForm
          register={register}
          errors={errors}
          control={control}
          setValueRegister={setValueRegister}
          list={[epsList, pensionList, arlList, levelRiskList, layoffList]}
        />
      ),
      position: 3,
      classContainerStep: "",
    },
  ];

  const STEPS_AMOUNT = stebs.length - 1;

  const handleNextStep = async () => {
    const isValid = await trigger();

    if (isValid && step < STEPS_AMOUNT) {
      setStep((cur) => cur + 1);
    }
  };

  const handleBackStep = async () => {
    if (step >= 0) {
      setStep((cur) => cur - 1);
    }
  };

  return (
    <>
      <FormSteps
        titleForm={"Vinculacion trabajador"}
        classFormSteb="border"
        stebs={stebs}
        handleSubmit={handleSubmit}
        handleNextStep={handleNextStep}
        handleBackStep={handleBackStep}
        validForm={isValid}
        stepsAmount={STEPS_AMOUNT}
        watch={watch}
      />
    </>
  );
};

export default PayrollForm;
