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
import {
  calculateBusinessDays,
  calculateDifferenceDays,
} from "../../../common/utils/helpers";

export default function useLicenceData() {
  const resolver = useYupValidationResolver(createLicenceSchema);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
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
  const { setMessage } = useContext(AppContext);

  const [licenceTypesList, setLicenceTypesList] = useState([]);
  const [licenceDays, setLicenceDays] = useState<ILicenceType[]>([]);
  const [listLicencesStates, setListLicencesStates] = useState([]);
  const [numberDays, setNumberDays] = useState<number>(0);
  const [typeDays, setTypeDays] = useState<string>("");
  const [sending, setSending] = useState(false);

  const [dateEnd, dateStart, licenceType] = watch([
    "dateEnd",
    "dateStart",
    "idLicenceType",
  ]);

  useEffect(() => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    if ((dateEnd ?? new Date("00/00/0000")) < today) {
      setValueRegister("licenceState", "Finalizado");
    } else {
      setValueRegister("licenceState", "En progreso");
    }
    if (dateStart && dateEnd)
      setValueRegister(
        "totalDays",
        typeDays == "Calendario"
          ? calculateDifferenceDays(dateStart, dateEnd)
          : calculateBusinessDays(dateStart, dateEnd)
      );
  }, [dateEnd]);
  useEffect(() => {
    setValueRegister("dateEnd", null);
  }, [dateStart]);

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
    setValueRegister("dateStart", null);
    setValueRegister("dateEnd", null);
    setValueRegister("licenceState", "En progreso");
    const totalDaysLicence = licenceDays.find(
      (licence) => licence.id == licenceType
    );
    if (totalDaysLicence?.numberDays) {
      setNumberDays(totalDaysLicence?.numberDays);
      setTypeDays(totalDaysLicence?.daysType);
    } else {
      setNumberDays(0);
      setTypeDays(totalDaysLicence?.daysType);
    }
  }, [licenceType]);

  const handleModalCreate = handleSubmit(async (data: ILicence) => {
    setMessage({
      title: "Crear licencia",
      description: `¿Estás segur@ de crear esta licencia?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        handleCreateLicence(data);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

  const handleModalCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas
      cancelar la licencia?`,
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

  const handleCreateLicence = async (data: ILicence) => {
    const dataformated = {
      ...data,
      dateEnd: new Date(dateEnd).toISOString(),
      dateStart: new Date(dateStart).toISOString(),
    };

    setSending(true);
    await createLicence(dataformated)
      .then((response: ApiResponse<ILicence>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setMessage({
            title: "Licencia creada",
            description: `¡Se creó la licencia exitosamente!`,
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
            title: "Error al registrar la licencia.",
            description: response?.operation?.message,
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
          title: "Error al registrar la licencia.",
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
    handleSubmit,
    handleCreateLicence,
    handleModalCreate,
    handleModalCancel,
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
    isValid,
    numberDays,
    typeDays,
  };
}
