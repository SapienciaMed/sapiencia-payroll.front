import { useContext, useEffect, useState } from "react";
import { ApiResponse } from "../../../common/utils/api-response";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import usePayrollService from "../../../common/hooks/payroll.hook";
import {
  ICharge,
  ITypesCharges,
  ITypesContracts,
} from "../../../common/interfaces/payroll.interfaces";

export default function useEmploymentsData() {
  /*States*/
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
  const { getCharges, getTypesContracts } = usePayrollService();
  /*UseEffects*/
  useEffect(() => {
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
      "ESTADO_TRABAJADOR"
    ];
    getListByGroupers(groupers)
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
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
      })
      .catch((e) => {});
  }, []);

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
    activeWorker
  };
}
