import React, { useContext } from "react";
import FormSteps from "../../common/components/Form/form-steps.component";
import { useForm, Controller } from "react-hook-form";
import AffiliationsForm from "./affiliations.components";
import ContractualInformationForm from "./contractual-information.component";
import FamiliarInformationForm from "./familiar-information.component";
import InformationPersonalForm from "./personal-information.component";
import { formsPayroll } from "../../common/schemas/employment-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "../../common/contexts/app.context";
import useEmploymentsData from "./hooks/Employments.hook";
import { FormStebs } from "../../common/interfaces/tabs-menu.interface";

const PayrollForm = () => {
  const { step } = useContext(AppContext);

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
    setDeparment,
    setTown,
  } = useEmploymentsData();

  const currentValidationSchema = formsPayroll[step];

  const {
    register,
    watch,
    formState: { errors, isValid, isDirty },
    control,
    handleSubmit,
    trigger,
    setValue: setValueRegister,
  } = useForm({
    // defaultValues: {
    //   worker: {},
    // },
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
        <ContractualInformationForm register={register} errors={errors} />
      ),
      position: 2,
      classContainerStep: "",
    },
    {
      titleSteb: "4. Area funcional",
      contentStep: <AffiliationsForm register={register} errors={errors} />,
      position: 3,
      classContainerStep: "",
    },
  ];

  return (
    <>
      <FormSteps
        titleForm={"Vinculacion trabajador"}
        classFormSteb="border"
        stebs={stebs}
        triggerValidate={trigger}
        handleSubmit={handleSubmit}
        validForm={isValid}
        watch={watch}
      />
    </>
  );
};

export default PayrollForm;
