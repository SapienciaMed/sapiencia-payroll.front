import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createLicenceSchema } from "../../../common/schemas";
import useListData from "../../vacation/hooks/list.hook";
import {
  ILicence,
  ILicenceType,
} from "../../../common/interfaces/payroll.interfaces";
import { useContext, useEffect, useState } from "react";
import useLicencesService from "../../../common/hooks/licences-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";

export default function useLicenceData() {
  const resolver = useYupValidationResolver(createLicenceSchema);
  const {
    handleSubmit,
    register,
    formState: { errors,isValid },
    control,
    setValue: setValueRegister,
    watch,
  } = useForm<ILicence>({
    defaultValues: { licenceState: "En progreso" },
    resolver,
    mode: "all",
  });
  const { activeWorkerList } = useListData();
  const { createLicence, getLicenceTypesList } = useLicencesService();
  const { getListByGrouper } = useGenericListService();
  const navigate = useNavigate();
  const { setMessage, authorization } = useContext(AppContext);

  const [licenceTypesList, setLicenceTypesList] = useState([]);
  const [licenceDays, setLicenceDays] = useState<ILicenceType[]>([]);
  const [listLicencesStates, setListLicencesStates] = useState([]);
  const [sending, setSending] = useState(false);

  const [dateEnd, dateStart, licenceType] = watch([
    "dateEnd",
    "dateStart",
    "idLicenceType",
  ]);

  useEffect(() => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    if (dateEnd < today) {
      setValueRegister("licenceState", "Finalizado");
    } else {
      setValueRegister("licenceState", "En progreso");
    }
  }, [dateEnd]);
  useEffect(() => {
    getLicenceTypesList()
      .then((response: ApiResponse<ILicenceType[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setLicenceDays(response.data);
          setLicenceTypesList(
            response.data.map((item) => {
              return { name: item.name, value: item.id };
            })
          );
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getListByGrouper("ESTADOS_LICENCIAS")
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setListLicencesStates(
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
    const totalDaysLicence = licenceDays.find(
      (licence) => licence.id == licenceType
    );
    if(totalDaysLicence?.numberDays){
      setValueRegister("totalDays",totalDaysLicence?.numberDays)
    }
    console.log(totalDaysLicence);
  }, [licenceType]);

  const handleCreateLicence = handleSubmit(async (data: ILicence) => {
    setSending(true);
    await createLicence(data)
      .then((response: ApiResponse<ILicence>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setMessage({
            title: "Vincular Trabajador",
            description: `Trabajador con exito`,
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
  });

  return {
    handleSubmit,
    handleCreateLicence,
    register,
    errors,
    control,
    setValueRegister,
    watch,
    activeWorkerList,
    licenceTypesList,
    licenceDays,
    listLicencesStates,
    dateStart,
    sending,
    isValid
  };
}
