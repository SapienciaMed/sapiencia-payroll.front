import { useContext } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import useIncapacityService from "../../../common/hooks/incapacity-service.hook";
import {
  IGetIncapacity,
  IIncapacity,
} from "../../../common/interfaces/payroll.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import IncapacityDetailPage from "../pages/detail-incapacity.page";

export default function useViewIncapacityDetail() {
  const { setMessage } = useContext(AppContext);

  const { getByIdIncapacity } = useIncapacityService();

  const navigate = useNavigate();

  const handleModalViewIncapacity = (data: IGetIncapacity) => {
    setMessage({
      title: "Detalle de incapacidad",
      show: true,
      OkTitle: "Aceptar",
      description: (
        <div className="container-modal_description">
          <IncapacityDetailPage data={data} />
        </div>
      ),
      size: "big",
      onOk: () => {
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      onClose: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      background: true,
    });
  };

  const showDetailIncapacity = async (id: number) => {
    const { data } = await getByIdIncapacity(id);
    return handleModalViewIncapacity(data);
  };

  return {
    showDetailIncapacity,
    navigate,
  };
}
