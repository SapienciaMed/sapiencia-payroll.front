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
import useAppCominicator from "../../../common/hooks/app-communicator.hook";
import { useForm } from "react-hook-form";
import { formsPayroll } from "../../../common/schemas/employment-schema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useEmploymentsData() {
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
    },
  } as IVinculation);

  const [familyData, setFamilyData] = useState<{ familiar: IRelative[] }>({
    familiar: vinculation.relatives,
  });

  const {
    register,
    formState: { errors, isValid },
    control,
    getValues: getValueRegister,
    handleSubmit,
    trigger,
    watch,
    setValue: setValueRegister,
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
  const [deparment, setDeparment] = useState("");
  const [townList, setTownList] = useState([]);
  const [town, setTown] = useState("");
  const [neighborhoodList, setneighborhoodList] = useState([]);
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

  /*instances*/
  const { getListByParent, getListByGroupers } = useGenericListService();

  const navigate = useNavigate();

  const { setMessage, authorization } = useContext(AppContext);
  const { getVinculationById, getCharges, getTypesContracts, createWorker, updateWorker } =
    usePayrollService();
  const { publish, subscribe, unsubscribe } = useAppCominicator();

  const handleModal = () => {
    setMessage({
      title: "Vincular Trabajador",
      description: "Trabajador Vinculado con exito",
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("/");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        setMessage({});
      },
      background: true,
    });
  };

  /*UseEffects*/
  // useEffect(() => {
  //   const groupers = [
  //     "GENEROS",
  //     "TIPOS_DOCUMENTOS",
  //     "TIPO_SANGUINEO",
  //     "ESTRATO",
  //     "PARENTESCO",
  //     "TIPO_VIVIENDA",
  //     "PAISES",
  //     "EPS",
  //     "ARL",
  //     "FONDO_PENSIONES",
  //     "FONDO_CESANTIAS",
  //     "RIESGO_LABORAL",
  //     "ESTADO_TRABAJADOR",
  //   ];
  //   getListByGroupers(groupers)
  //     .then((response: ApiResponse<IGenericList[]>) => {
  //       if (response && response?.operation?.code === EResponseCodes.OK) {
  //         setTypeDocumentList(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "TIPOS_DOCUMENTOS")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemCode,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setGenderList(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "GENEROS")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setBloodType(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "TIPO_SANGUINEO")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setSocioEconomicStatus(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "ESTRATO")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setRelationship(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "PARENTESCO")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setHousingType(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "TIPO_VIVIENDA")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setNacionality(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "PAISES")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setEpsList(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "EPS")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setArlList(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "ARL")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setPensionList(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "FONDO_PENSIONES")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setLayoffList(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "FONDO_CESANTIAS")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setLevelRiskList(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "RIESGO_LABORAL")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //         setActiveWorker(
  //           response.data
  //             .filter((grouper) => grouper.grouper == "ESTADO_TRABAJADOR")
  //             .map((item) => {
  //               const list = {
  //                 name: item.itemDescription,
  //                 value: item.itemCode,
  //               };
  //               return list;
  //             })
  //         );
  //       }
  //     })
  //     .catch((e) => {});
  // }, []);

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
    setTown("");
    getListByParent({ grouper: "MUNICIPIOS", parentItemCode: deparment })
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
  }, [deparment]);

  useEffect(() => {
    getListByParent({ grouper: "BARRIOS", parentItemCode: town })
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setneighborhoodList(
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
  }, [town, deparment]);

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
    }
  }

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
      }
    });
  }, [id]);

  useEffect(() => {
    if (!vinculation) return;

    if (vinculation.worker.id) {
      setValueRegister("worker", vinculation?.worker, { shouldValidate: true });
    }

    setValueRegister("relatives", vinculation?.relatives);
    setValueRegister("employment", vinculation?.employment[0]);

    setFamilyData({ familiar: vinculation?.relatives });

    changeData((prev) => {
      return prev + 1;
    });
  }, [vinculation]);

  const handleCreateWorker = async (data: IVinculation) => {
    setSending(true);
    await createWorker(data)
      .then((response: ApiResponse<IVinculation>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          handleModal();
          setSending(false);
        }else{
          setMessage({
            type: EResponseCodes.FAIL,
            title: "Crear Usuario",
            description: "El usuario ya se encuentra registrado en el sistema",
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
          title: "Crear Usuario",
          description: "El usuario ya se encuentra registrado en el sistema",
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
        } else{
          setMessage({
            type: EResponseCodes.FAIL,
            title: "Crear Usuario",
            description: "El usuario ya se encuentra registrado en el sistema",
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
          title: "Crear Usuario",
          description: "El usuario ya se encuentra registrado en el sistema",
          show: true,
          OkTitle: "Aceptar",
          background: true,
        });
        setSending(false);
      });
  };


  const cancelFunction = () => {
    setMessage({
      show: true,
      title: "Crear usuario",
      description: "¿Seguro que desea cancelar la creación de usuario?",
      OkTitle: "Continuar",
      cancelTitle: "Si,Cancelar",
      onCancel() {
        navigate("/");
        setMessage((prev) => ({ ...prev, show: false }));
      },
      background: true,
    });
  };

  return {
    genderList,
    typeDocumentList,
    cancelFunction,
    setDeparment,
    setTown,
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
  };
}
