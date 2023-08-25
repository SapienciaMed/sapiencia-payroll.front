import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createUpdateIncrementSalarySchema } from "../../../common/schemas";

import { EResponseCodes } from "../../../common/constants/api.enum";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { ICharge } from "../../../common/interfaces/payroll.interfaces";

import { calculateIncrement } from "../../../common/utils/helpers";

import { AppContext } from "../../../common/contexts/app.context";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";

export default function useCreateUpdateIncrementSalary() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getCharges } = usePayrollService();

  //states
  const [charges, setCharges] = useState<IDropdownProps[]>([]);
  const [chargeData, setChargeData] = useState<ICharge[]>([]);

  //ref

  //react-router-dom
  const navigate = useNavigate();

  //useForm
  const resolver = useYupValidationResolver(createUpdateIncrementSalarySchema);

  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm({
      resolver,
      mode: "all",
      defaultValues: {
        idCharge: "",
        salaryActual: "",
        numActaAprobacion: "",
        porcentaje: "",
        porcentajeIncremento: "",
        newSalary: 0,
      },
      shouldUnregister: true,
    });

  const [idCharge, porcentaje, salaryActual, porcentajeIncremento] = watch([
    "idCharge",
    "porcentaje",
    "salaryActual",
    "porcentajeIncremento",
  ]);

  // useEffects

  //carga combos

  useEffect(() => {
    loadDropdown();
  }, []);

  // watch

  useEffect(() => {
    if (idCharge) {
      const { baseSalary } = chargeData.find(
        (charge) => Number(charge.id) === idCharge
      );
      setValue("salaryActual", baseSalary);
    } else {
      setValue("salaryActual", "");
    }
  }, [idCharge]);

  useEffect(() => {
    if (porcentaje && salaryActual) {
      setValue("newSalary", "", { shouldValidate: true });
    } else {
      setValue("porcentajeIncremento", "");
    }
  }, [porcentaje, salaryActual]);

  useEffect(() => {
    if (porcentajeIncremento && salaryActual) {
      const valueIncrement = calculateIncrement(
        Number(salaryActual),
        Number(porcentajeIncremento)
      );

      setValue("newSalary", valueIncrement, { shouldValidate: true });
    } else {
      setValue("newSalary", "", { shouldValidate: true });
    }
  }, [porcentajeIncremento, salaryActual]);

  //functions
  const loadDropdown = async () => {
    //charges
    const { data, operation } = await getCharges();
    if (operation.code === EResponseCodes.OK) {
      const chargesList = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });

      setChargeData(data);
      setCharges(chargesList);
    } else {
      setCharges([]);
    }
  };

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que desea 
      cancelar el incremento?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  //variables

  return {
    register,
    control,
    formState,
    onSubmit,
    redirectCancel,
    charges,
    porcentaje,
    idCharge,
  };
}
