import React, { useContext, useState } from "react";
import FormSteps from "../../../common/components/Form/form-steps.component";
import { useForm } from "react-hook-form";
import { formsPayroll } from "../../../common/schemas/employment-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "../../../common/contexts/app.context";
import { FormStebs } from "../../../common/interfaces/tabs-menu.interface";
import useEmploymentsData from "../hooks/employment.hook";
import {
  ICreateWorker,
  IRelative,
} from "../../../common/interfaces/payroll.interfaces";
import usePayrollService from "../../../common/hooks/payroll.hook";
import AffiliationsForm from "../forms/other-fields.form";
import ContractualInformationForm from "../forms/contractual-information.form";
import FamiliarInformationForm from "../forms/familiar-information.form";
import InformationPersonalForm from "../forms/personal-information.form";

const EmploymentRelationshipPage = () => {
  const [familyData, setFamilyData] = useState<{ familiar: IRelative[] }>();

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
    activeWorker,
    setDeparment,
    setTown,
  } = useEmploymentsData();

  const { handleCreateWorker } = useEmploymentsData();

  const currentValidationSchema = formsPayroll[step];

  const {
    register,
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
        fundPension: "",
        severanceFund: "",
        arl: "",
        riskLevel: "",
        housingType: "",
      },
      relatives: [{}],
      employment: {
        idTypeContract: "",
        contractNumber: "",
        institutionalMail: "",
        startDate: "",
        endDate: "",
        idCharge: "",
        idReasonRetirement: "",
        state: "",
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
          setFamilyData={setFamilyData}
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
          list={[typesContracts, typesChargesList, activeWorker]}
        />
      ),
      position: 2,
      classContainerStep: "",
    },
    {
      titleSteb: "4. Afiliaciones",
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

  const stepsAmount = stebs.length - 1;

  const handleNextStep = async () => {
    const isValid = await trigger();

    if (step === 1) {
      if (familyData?.familiar)
        setValueRegister("relatives", familyData.familiar);
    }

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
    <>
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
        actionSubmit={handleCreateWorker}
      />
    </>
  );
};

export default React.memo(EmploymentRelationshipPage);
