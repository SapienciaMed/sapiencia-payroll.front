import { useContext, useEffect, useState } from "react";
import { ApiResponse } from "../../../common/utils/api-response";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";

export default function useEmploymentsData() {
    /*States*/
    const [genderList, setGenderList] = useState([]);
    const [typeDocumentList, setTypeDocumentList] = useState([]);
    const [deparmentList, setDeparmentList] = useState([]);
    const [nacionality,setNacionality] = useState([]);
    const [deparment, setDeparment] = useState("");
    const [townList, setTownList] = useState([]);
    const [town, setTown] = useState("");
    const [neighborhoodList, setneighborhoodList] = useState([]);
    const [sending, setSending] = useState(false);
    const [socioEconomicStatus, setSocioEconomicStatus] = useState([])
    const [bloodType, setBloodType] = useState([])
    const [relationship, setRelationship] = useState([])
    const [housingType, setHousingType] = useState([])
    /*instances*/
    const { getListByParent, getListByGroupers } = useGenericListService();
  
    const navigate = useNavigate();
  
    const { setMessage, authorization } = useContext(AppContext);
  
    /*UseEffects*/
    useEffect(() => {
      const groupers = ["GENEROS", "TIPOS_DOCUMENTOS","TIPO_SANGUINEO","ESTRATO","PARENTESCO","TIPO_VIVIENDA","PAISES"];
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
  
    /*Functions*/
  
    const CancelFunction = () => {
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
      CancelFunction,
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
      nacionality
    };
  }