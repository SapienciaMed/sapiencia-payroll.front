import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";

import { IManualDeduction } from "../../../common/interfaces/payroll.interfaces";
import { EDeductionns } from "../../../common/constants/deductions.enum";

import { formDeduction } from "../../../common/schemas";
import { EResponseCodes } from "../../../common/constants/api.enum";

import useListData from "../../vacation/hooks/list.hook";
import useDeductionService from "../../../common/hooks/deduction-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";

interface IPropsUseCreateAndUpdateDeductions {
  action: string;
}

const useCreateAndUpdateDeductions = ({
  action,
}: IPropsUseCreateAndUpdateDeductions) => {
  //react router dom
  const navigate = useNavigate();

  // Context
  const { setMessage } = useContext(AppContext);

  //useState
  const [deductionsTypeByTypeList, setDeductionsTypeByTypeList] = useState([]);
  const [indexArrayYupValidator, setIndexArrayYupValidator] = useState(0);

  //custom hooks
  const { activeWorkerList, lastPeriodsList } = useListData();
  const { getDeductionTypesByType, createDeduction } = useDeductionService();

  //variables
  const typeDeductionList = [
    {
      name: "Eventuales",
      value: "Eventual",
    },
    {
      name: "Cíclicas",
      value: "Ciclica",
    },
  ];

  //use form
  const currentValidationSchema = formDeduction[indexArrayYupValidator];

  const resolver = useYupValidationResolver(currentValidationSchema);

  const { control, formState, setValue, watch, handleSubmit } =
    useForm<IManualDeduction>({
      defaultValues: async () => loadDefaultValues(),
      mode: "all",
      resolver,
    });

  const [typeDeduction, porcentualValue, totalMount, numberInstallments] =
    watch([
      "typeDeduction",
      "porcentualValue",
      "totalMount",
      "numberInstallments",
    ]);

  //useEffect

  //watch
  useEffect(() => {
    // if (formState.dirtyFields.typeDeduction) {
    if (typeDeduction === EDeductionns.Eventuales) {
      setIndexArrayYupValidator(1);
      setValue("cyclic", false);
      setValue("numberInstallments", null);
      setValue("applyExtraordinary", null);
      setValue("totalMount", null);
    } else if (typeDeduction === EDeductionns.Ciclica) {
      setIndexArrayYupValidator(2);
      setValue("cyclic", true);
    } else {
      setIndexArrayYupValidator(0);
      setValue("cyclic", null);
    }
    // }

    if (typeDeduction) {
      getDeductionTypesByType(typeDeduction)
        .then((response) => {
          const { data, operation } = response;
          if (operation.code === EResponseCodes.OK) {
            const dataFormated = data.map((item) => {
              return {
                name: item.name,
                value: item.id,
              };
            });

            setDeductionsTypeByTypeList(dataFormated);
          }
        })
        .catch(() => {});
    }
  }, [typeDeduction]);

  useEffect(() => {
    setValue("value", null, { shouldValidate: true });

    if (typeDeduction === EDeductionns.Ciclica) {
      setValue("numberInstallments", null);
      setValue("totalMount", null);
    }
  }, [porcentualValue]);

  useEffect(() => {
    if (typeDeduction === EDeductionns.Ciclica) {
      if (totalMount && numberInstallments) {
        const valuePerQuota = totalMount / numberInstallments;

        setValue("value", valuePerQuota, { shouldValidate: true });
      } else {
        setValue("value", null, { shouldValidate: true });
      }
    }
  }, [totalMount, numberInstallments]);

  //functions
  const renderTitleDeduction = () => {
    return action === "edit" ? "Editar deducción" : "Crear deducción";
  };

  const loadDefaultValues = async (): Promise<IManualDeduction> => {
    if (action === "new") {
      return {
        id: null,
        typeDeduction: "",
        codEmployment: null,
        codDeductionType: null,
        cyclic: null,
        numberInstallments: null,
        applyExtraordinary: null,
        porcentualValue: false,
        value: null,
        totalMount: null,
        codFormsPeriod: null,
        state: "Vigente",
        observation: "",
      };
    }
  };

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar la deducción?`,
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

  const handleModalError = (
    msg = `¡Ha ocurrido un error!`,
    navigateBoolean = true
  ) => {
    setMessage({
      title: "Error",
      description: msg,
      show: true,
      OkTitle: "cerrar",
      onOk: () => {
        if (navigateBoolean) {
          navigate("../consultar");
        }
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        if (navigateBoolean) {
          navigate("../consultar");
        }
        setMessage({});
      },
      background: true,
    });
  };

  const handleModalSuccess = () => {
    setMessage({
      title: "Guardado",
      description: `Deducción ejecutada exitosamente`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        navigate("../consultar");
        setMessage({});
      },
      background: true,
    });
  };

  const handleSubmitDeduction = handleSubmit((data: IManualDeduction) => {
    setMessage({
      title: "Confirmación de deducción",
      description: `¿Estás segur@ de ejecutar
      la deducción?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateDeduction(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleCreateDeduction = async (data: IManualDeduction) => {
    const { data: dataResponse, operation } = await createDeduction(data);

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  return {
    control,
    formState,
    typeDeduction,
    porcentualValue,
    activeWorkerList,
    typeDeductionList,
    deductionsTypeByTypeList,
    lastPeriodsList,
    renderTitleDeduction,
    redirectCancel,
    handleSubmitDeduction,
  };
};

export default useCreateAndUpdateDeductions;
