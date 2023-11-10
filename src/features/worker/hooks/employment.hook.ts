import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppContext } from "../../../common/contexts/app.context";
import { ApiResponse } from "../../../common/utils/api-response";

import {
  ICharge,
  IVinculation,
  ITypesContracts,
  IRelative,
} from "../../../common/interfaces/payroll.interfaces";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";

import { formsPayroll } from "../../../common/schemas/employment-schema";

import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";

import usePayrollService from "../../../common/hooks/payroll-service.hook";
import useDependenceService from "../../../common/hooks/dependencies-service.hook";
import {
  calculateDifferenceDays,
  calculateMonthBetweenDates,
} from "../../../common/utils/helpers";
import { IDropdownProps } from "../../../common/interfaces/select.interface";

interface IPropsUseEmployments {
  action?: string;
}

const useEmployments = ({ action }: IPropsUseEmployments) => {
  // react router dom
  const { id } = useParams();
  const navigate = useNavigate();

  // context
  const { step, setStep, setMessage, authorization } = useContext(AppContext);

  // states
  const [genderList, setGenderList] = useState([]);
  const [chargesInfo, setChargesInfo] = useState<ICharge[]>([]);
  const [dependencesList, setDependencesList] = useState<IDropdownProps[]>([]);
  const [typeDocumentList, setTypeDocumentList] = useState([]);
  const [deparmentList, setDeparmentList] = useState([]);
  const [nacionality, setNacionality] = useState([]);
  const [townList, setTownList] = useState([]);
  const [neighborhoodList, setNeighborhoodList] = useState([]);
  const [sending, setSending] = useState(false);
  const [socioEconomicStatus, setSocioEconomicStatus] = useState([]);
  const [bloodType, setBloodType] = useState([]);
  const [relationship, setRelationship] = useState([]);
  const [housingType, setHousingType] = useState([]);
  const [typesChargesList, setTypesChargesList] = useState([]);
  const [epsList, setEpsList] = useState([]);
  const [arlList, setArlList] = useState([]);
  const [pensionList, setPensionList] = useState([]);
  const [layoffList, setLayoffList] = useState([]);
  const [levelRiskList, setLevelRiskList] = useState([]);
  const [typesContracts, setTypesContracts] = useState([]);
  const [activeWorker, setActiveWorker] = useState([]);
  const [accountType, setAccountType] = useState([]);
  const [bankList, setBankList] = useState([]);

  const [vinculation, setVinculation] = useState<IVinculation>({
    worker: {
      id: null,
      typeDocument: "",
      numberDocument: "",
      firstName: "",
      secondName: "",
      surname: "",
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
      fiscalIdentification: "",
    },
    relatives: [],
    employment: {
      codDependence: null,
      idTypeContract: "",
      contractNumber: "",
      institutionalMail: "",
      specificObligations: "",
      contractualObject: "",
      startDate: "",
      endDate: "",
      idCharge: "",
      idReasonRetirement: "",
      state: "",
      settlementPaid: null,
    },
  } as IVinculation);

  //custom hooks
  const { getListByParent, getListByGroupers } = useGenericListService();

  const {
    getVinculationById,
    getCharges,
    getTypesContracts,
    createWorker,
    updateWorker,
  } = usePayrollService();

  const { getDependences } = useDependenceService();

  //react-hook-form
  const currentValidationSchema = formsPayroll[step];

  const {
    register,
    formState: { errors, isValid, dirtyFields },
    control,
    getValues: getValueRegister,
    handleSubmit,
    trigger,
    watch,
    setValue: setValueRegister,
    reset,
  } = useForm<IVinculation>({
    defaultValues: vinculation,
    resolver: yupResolver(currentValidationSchema),
    mode: "all",
  });

  const [department, municipality] = watch([
    "worker.department",
    "worker.municipality",
  ]);

  const [idTypeContract, idCharge, startDate, endDate, totalValue] = watch([
    "employment.idTypeContract",
    "employment.idCharge",
    "employment.startDate",
    "employment.endDate",
    "employment.totalValue",
  ]);

  // useEffect

  //Validar tipo de contrato

  useEffect(() => {
    // if (dirtyFields.employment?.idTypeContract) {
    if (Number(idTypeContract) === 4) {
      if (startDate && endDate && totalValue) {
        const days = calculateDifferenceDays(startDate, endDate);

        if (days > 30) {
          const months = calculateMonthBetweenDates(startDate, endDate);

          const salaryMonth = totalValue / months;

          setValueRegister("employment.salary", salaryMonth);
        } else {
          setValueRegister("employment.salary", totalValue);
        }
      } else {
        setValueRegister("employment.salary", 0);
      }
    } else {
      setValueRegister("employment.totalValue", 0);

      if (idCharge) {
        const infoChargeSelected = chargesInfo.find(
          (i) => i.id === Number(idCharge)
        );

        setValueRegister("employment.salary", infoChargeSelected.baseSalary);
      } else {
        setValueRegister("employment.salary", 0);
      }
    }
    // }
  }, [idTypeContract, idCharge, startDate, endDate, totalValue]);

  useEffect(() => {
    setValueRegister("employment.endDate", null, { shouldValidate: true });
  }, [idTypeContract]);

  // departments
  useEffect(() => {
    getListByParent({ grouper: "DEPARTAMENTOS", parentItemCode: "COL" })
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setDeparmentList(
            response.data.map((item) => {
              const list = {
                name: item.itemDescription,
                value: item.itemCode,
              };
              return list;
            })
          );
        }
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    if (dirtyFields.worker?.department) {
      setValueRegister("worker.municipality", "");
      setValueRegister("worker.neighborhood", "");
    }
    setTownList([]);
    setNeighborhoodList([]);

    getListByParent({ grouper: "MUNICIPIOS", parentItemCode: department })
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setTownList(
            response.data.map((item) => {
              const list = {
                name: item.itemDescription,
                value: item.itemCode,
              };

              return list;
            })
          );
        }
      })
      .catch((err) => {});
  }, [department]);

  useEffect(() => {
    if (dirtyFields.worker?.municipality) {
      setValueRegister("worker.neighborhood", "");
    }
    setNeighborhoodList([]);

    getListByParent({ grouper: "BARRIOS", parentItemCode: municipality })
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setNeighborhoodList(
            response.data.map((item) => {
              const list = {
                name: item.itemDescription,
                value: item.itemCode,
              };
              return list;
            })
          );
        }
      })
      .catch((err) => {});
  }, [municipality]);

  useEffect(() => {}, []);

  useEffect(() => {
    getTypesContracts()
      .then((response: ApiResponse<ITypesContracts[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setTypesContracts(
            response.data.map((item) => {
              const list = {
                name: item.name,
                value: item.id,
              };
              return list;
            })
          );
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getCharges()
      .then((response: ApiResponse<ICharge[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setTypesChargesList(
            response.data.map((item) => {
              const list = {
                name: item.name,
                value: item.id,
              };
              return list;
            })
          );

          setChargesInfo(response.data);
        }
      })
      .catch((err) => {});

    loadDependences();
  }, []);

  useEffect(() => {
    loadInitList().then(() => {
      if (id) {
        getVinculationById(Number(id)).then(
          ({ data, operation }: ApiResponse<IVinculation>) => {
            if (operation.code === EResponseCodes.OK) {
              setVinculation(data);
            }
          }
        );
      } else {
        setVinculation({
          worker: {
            id: null,
            typeDocument: "",
            numberDocument: "",
            firstName: "",
            secondName: "",
            surname: "",
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
            fiscalIdentification: "",
          },
          relatives: [],
          employment: {
            codDependence: null,
            idTypeContract: "",
            contractNumber: "",
            institutionalMail: "",
            specificObligations: "",
            contractualObject: "",
            startDate: "",
            endDate: "",
            idCharge: "",
            idReasonRetirement: "",
            state: "",
            settlementPaid: null,
          },
        } as IVinculation);
      }
    });
  }, [id]);

  useEffect(() => {
    setStep(0);
  }, [action]);

  useEffect(() => {
    if (!vinculation) return;

    if (action === "edit" && vinculation.employment[0]?.state === "0") {
      setMessage({
        title: "Vinculación inactiva",
        description: `No se permite editar la vinculacion debido a su estado inactiva.`,
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          navigate("../expedientes");
          setMessage((prev) => {
            return { ...prev, show: false };
          });
        },
        onClose: () => {
          navigate("../expedientes");
          setMessage({});
        },
        background: true,
      });

      return;
    }

    if (vinculation.worker.id) {
      setValueRegister("worker", vinculation?.worker, { shouldValidate: true });
    }

    setValueRegister("relatives", vinculation?.relatives);
    setValueRegister("employment", vinculation?.employment[0]);
  }, [vinculation]);

  /*Functions*/

  async function loadInitList(): Promise<void> {
    const groupers = [
      "GENEROS",
      "TIPOS_DOCUMENTOS",
      "TIPO_SANGUINEO",
      "ESTRATO",
      "PARENTESCO",
      "TIPO_VIVIENDA",
      "PAISES",
      "EPS",
      "ARL",
      "FONDO_PENSIONES",
      "FONDO_CESANTIAS",
      "RIESGO_LABORAL",
      "ESTADO_TRABAJADOR",
      "TIPO_CUENTA",
      "BANCO",
    ];

    const response = await getListByGroupers(groupers);

    if (response.operation.code === EResponseCodes.OK) {
      setTypeDocumentList(
        response.data
          .filter((grouper) => grouper.grouper == "TIPOS_DOCUMENTOS")
          .map((item) => {
            const list = {
              name: item.itemCode,
              value: item.itemCode,
            };
            return list;
          })
      );
      setGenderList(
        response.data
          .filter((grouper) => grouper.grouper == "GENEROS")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setBloodType(
        response.data
          .filter((grouper) => grouper.grouper == "TIPO_SANGUINEO")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setSocioEconomicStatus(
        response.data
          .filter((grouper) => grouper.grouper == "ESTRATO")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setRelationship(
        response.data
          .filter((grouper) => grouper.grouper == "PARENTESCO")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setHousingType(
        response.data
          .filter((grouper) => grouper.grouper == "TIPO_VIVIENDA")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setNacionality(
        response.data
          .filter((grouper) => grouper.grouper == "PAISES")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setEpsList(
        response.data
          .filter((grouper) => grouper.grouper == "EPS")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setArlList(
        response.data
          .filter((grouper) => grouper.grouper == "ARL")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setPensionList(
        response.data
          .filter((grouper) => grouper.grouper == "FONDO_PENSIONES")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setLayoffList(
        response.data
          .filter((grouper) => grouper.grouper == "FONDO_CESANTIAS")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setLevelRiskList(
        response.data
          .filter((grouper) => grouper.grouper == "RIESGO_LABORAL")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setActiveWorker(
        response.data
          .filter((grouper) => grouper.grouper == "ESTADO_TRABAJADOR")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setAccountType(
        response.data
          .filter((grouper) => grouper.grouper == "TIPO_CUENTA")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
      setBankList(
        response.data
          .filter((grouper) => grouper.grouper == "BANCO")
          .map((item) => {
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          })
      );
    }
  }

  const loadDependences = async (): Promise<void> => {
    const { data, operation } = await getDependences();

    if (operation.code === EResponseCodes.OK) {
      const dependencesList = data.map((dependence) => {
        return { name: dependence.name, value: dependence.id };
      }) as IDropdownProps[];

      setDependencesList(dependencesList);
    } else {
      setDependencesList([]);
    }
  };

  const handleCreateWorker = async (data: IVinculation) => {
    setSending(true);
    await createWorker(data)
      .then((response: ApiResponse<IVinculation>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          handleModal();
          setSending(false);
        } else {
          setMessage({
            type: EResponseCodes.FAIL,
            title: "Error al registrar la vinculación.",
            description:
              "Se ha presentado un error, por favor vuelve a intentarlo.",
            show: true,
            OkTitle: "Aceptar",
            background: true,
          });
          setSending(false);
        }
      })
      .catch((err) => {
        setMessage({
          type: EResponseCodes.FAIL,
          title: "Error al registrar la vinculación.",
          description:
            "Se ha presentado un error, por favor vuelve a intentarlo.",
          show: true,
          OkTitle: "Aceptar",
          background: true,
        });
        setSending(false);
      });
  };

  const handleUpdateWorker = async (data: IVinculation) => {
    setSending(true);
    await updateWorker(data)
      .then((response: ApiResponse<IVinculation>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          handleModal();
          setSending(false);
        } else {
          setMessage({
            type: EResponseCodes.FAIL,
            title: "Error al editar la vinculación.",
            description:
              "Se ha presentado un error, por favor vuelve a intentarlo.",
            show: true,
            OkTitle: "Aceptar",
            background: true,
          });
          setSending(false);
        }
      })
      .catch((err) => {
        setMessage({
          type: EResponseCodes.FAIL,
          title: "Error al editar la vinculación.",
          description:
            "Se ha presentado un error, por favor vuelve a intentarlo.",
          show: true,
          OkTitle: "Aceptar",
          background: true,
        });
        setSending(false);
      });
  };

  const handleModal = () => {
    setMessage({
      title: "Vincular Trabajador",
      description: `Trabajador ${id ? "editado" : "vinculado"} con exito`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("../expedientes/");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        navigate("../expedientes/");
        setMessage({});
      },
      background: true,
    });
  };

  return {
    genderList,
    dependencesList,
    typeDocumentList,
    authorization,
    deparmentList,
    townList,
    neighborhoodList,
    sending,
    bloodType,
    housingType,
    socioEconomicStatus,
    relationship,
    nacionality,
    typesChargesList,
    typesContracts,
    arlList,
    epsList,
    layoffList,
    pensionList,
    levelRiskList,
    activeWorker,
    vinculation,
    register,
    errors,
    isValid,
    trigger,
    control,
    handleSubmit,
    setValueRegister,
    step,
    setStep,
    handleCreateWorker,
    handleUpdateWorker,
    getValueRegister,
    watch,
    navigate,
    accountType,
    bankList,
    reset,
  };
};

export default useEmployments;
