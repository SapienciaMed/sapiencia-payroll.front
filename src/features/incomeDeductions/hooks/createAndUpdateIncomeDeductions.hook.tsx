import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../../../common/contexts/app.context";

import { createOrUpdateTaxDeductible } from "../../../common/schemas";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { EStatesTaxDeduction } from "../../../common/constants/taxdeduction.enum";

import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";

import useListData from "../../vacation/hooks/list.hook";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { ITaxDeductible } from "../../../common/interfaces/payroll.interfaces";
import useTaxDeductionService from "../../../common/hooks/taxDeductions-service.hook";

interface IPropsUseCreateAndUpdateOtherIncome {
  action: string;
}

const useCreateAndUpdateIncomeDeduction = ({
  action,
}: IPropsUseCreateAndUpdateOtherIncome) => {
  //react router dom
  const navigate = useNavigate();

  const { id } = useParams();

  // hooks
  const { getListByGroupers } = useGenericListService();
  const { createTaxDeductible, updateTaxDeductible, getByIdTaxDeductible } =
    useTaxDeductionService();

  // Context
  const { setMessage } = useContext(AppContext);

  //useState
  const [typeTaxDeduction, setTypeTaxDeduction] = useState<IDropdownProps[]>(
    []
  );

  const [statesTaxDeductionList, setStatesTaxDeductionList] = useState<
    IDropdownProps[]
  >([
    {
      name: "Pendiente",
      value: "Pendiente",
    },
    {
      name: "Finalizado",
      value: "Finalizado",
    },
    {
      name: "Anulado",
      value: "Anulado",
    },
  ]);

  //custom hooks
  const { activeWorkerList } = useListData();

  //use form
  const resolver = useYupValidationResolver(createOrUpdateTaxDeductible);

  const { control, formState, handleSubmit, watch, getFieldState } =
    useForm<ITaxDeductible>({
      defaultValues: async () => loadDefaultValues(),
      mode: "all",
      resolver,
    });

  const state = watch("state");

  //useEffect

  useEffect(() => {
    loadInitList();
  }, []);

  //watch

  //functions
  const renderTitleDeduction = () => {
    return action === "edit"
      ? "Editar deducciones de renta"
      : "Crear deducciones de renta";
  };

  const validateStateField = (): boolean => {
    if (action === "new") {
      return true;
    }

    if (action === "edit") {
      const { isDirty } = getFieldState("state");

      if (!isDirty && state != EStatesTaxDeduction.Pendiente) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  };

  const loadInitList = async (): Promise<void> => {
    const groupers = ["TIPO_DEDUCCION_RENTA"];

    const { data, operation } = await getListByGroupers(groupers);

    if (EResponseCodes.OK === operation.code) {
      const optionsTypeTaxDeductions = data.map((item) => {
        return {
          name: item.itemDescription,
          value: item.itemCode,
        } as IDropdownProps;
      });

      setTypeTaxDeduction(optionsTypeTaxDeductions);
    } else {
      setTypeTaxDeduction([]);
    }
  };

  const loadDefaultValues = async (): Promise<ITaxDeductible> => {
    if (action === "new") {
      return {
        id: null,
        codEmployment: null,
        type: null,
        state: EStatesTaxDeduction.Pendiente,
        value: null,
        year: null,
      } as ITaxDeductible;
    }

    if (action === "edit") {
      const { data, operation } = await getByIdTaxDeductible(Number(id));

      if (operation.code === EResponseCodes.OK) {
        return {
          id: data.id,
          codEmployment: data.codEmployment,
          type: data.type,
          state: data.state,
          value: data.value,
          year: data.year,
        } as ITaxDeductible;
      } else {
        handleModalError("No se han cargado los datos");

        return {
          id: null,
          codEmployment: null,
          type: null,
          state: EStatesTaxDeduction.Pendiente,
          value: null,
          year: null,
        } as ITaxDeductible;
      }
    }
  };

  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar la deducción de renta?`,
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
      title: ` ${action === "edit" ? "Editado" : "Guardado"}`,
      description: `Deducción de renta ${
        action === "edit" ? "editada" : "ejecutada"
      } exitosamente`,
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

  const handleSubmitOtherIncome = handleSubmit((data: ITaxDeductible) => {
    setMessage({
      title: "Confirmación de deducción de renta",
      description: `¿Estás segur@ de ${
        action === "edit" ? "editar" : "ejecutar"
      }
      la deducción?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateOrUpdateOtherIncome(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleCreateOrUpdateOtherIncome = async (data: ITaxDeductible) => {
    const { data: dataResponse, operation } =
      action === "edit"
        ? await updateTaxDeductible(data)
        : await createTaxDeductible(data);

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  return {
    control,
    formState,
    activeWorkerList,
    typeTaxDeduction,
    statesTaxDeductionList,
    renderTitleDeduction,
    redirectCancel,
    validateStateField,
    handleSubmitOtherIncome,
  };
};

export default useCreateAndUpdateIncomeDeduction;
