import { useContext, useEffect, useState } from "react";
import { ApiResponse } from "../../../common/utils/api-response";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import usePayrollService from "../../../common/hooks/payroll-service.hook";
import {
  ICharge,
  IVinculation,
  ITypesContracts,
  IRelative,
} from "../../../common/interfaces/payroll.interfaces";
import { useForm } from "react-hook-form";
import { formsPayroll } from "../../../common/schemas/employment-schema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useEmploymentsData(action?: string) {
  const { id } = useParams();
  const { step, setStep } = useContext(AppContext);
  const currentValidationSchema = formsPayroll[step];

  /*States*/
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
    },
    relatives: [],
    employment: {
      idTypeContract: "",
      contractNumber: "",
      institutionalMail: "",
      startDate: "",
      endDate: "",
      idCharge: "",
      idReasonRetirement: "",
      state: "",
      salary: null,
      observation: "",
      totalValue: null,
    },
  } as IVinculation);

  const [familyData, setFamilyData] = useState<{ familiar: IRelative[] }>({
    familiar: vinculation.relatives,
  });

  const {
    register,
    formState: { errors, isValid, dirtyFields },
    control,
    getValues: getValueRegister,
    handleSubmit,
    trigger,
    watch,
    setValue: setValueRegister,
    reset
  } = useForm<IVinculation>({
    defaultValues: vinculation,
    resolver: yupResolver(currentValidationSchema),
    mode: "all",
  });
  const [changedData, changeData] = useState<number>(null);
  const [genderList, setGenderList] = useState([]);
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

  /*instances*/
  const { getListByParent, getListByGroupers } = useGenericListService();

  const navigate = useNavigate();

  const { setMessage, authorization } = useContext(AppContext);
  const {
    getVinculationById,
    getCharges,
    getTypesContracts,
    createWorker,
    updateWorker,
  } = usePayrollService();

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

  const [department, municipality] = watch([
    "worker.department",
    "worker.municipality",
  ]);

  const idTypeContract = watch("employment.idTypeContract");

  useEffect(() => {
    if (dirtyFields.employment?.idTypeContract && idTypeContract != "4") {
      setValueRegister("employment.observation", "");
      setValueRegister("employment.totalValue", null);

      return;
    }

    if (dirtyFields.employment?.idTypeContract && idTypeContract == "4") {
      setValueRegister("employment.salary", null);
    }
  }, [idTypeContract]);

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
        }
      })
      .catch((err) => {});
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
          },
          relatives: [],
          employment: {
            idTypeContract: "",
            contractNumber: "",
            institutionalMail: "",
            startDate: "",
            endDate: "",
            idCharge: "",
            idReasonRetirement: "",
            state: "",
            salary: null,
            observation: "",
            totalValue: null,
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

    setValueRegister("worker", vinculation?.worker);
    setValueRegister("relatives", vinculation?.relatives);
    setValueRegister("employment", vinculation?.employment[0]);

    setFamilyData({ familiar: vinculation?.relatives });
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

  return {
    genderList,
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
    changedData,
    changeData,
    getValueRegister,
    familyData,
    setFamilyData,
    watch,
    navigate,
    accountType,
    bankList,
    reset
  };
}
