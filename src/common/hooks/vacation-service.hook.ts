import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces";
import { ICreateVacation, IEditVacation, IVacation, IVacationDay } from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useVacationService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/vacations";

  const { get, post, put } = useCrudService(null, baseURL);

  async function getWorkerVacatioByParam(
    params
  ): Promise<ApiResponse<IVacation>> {
    try {
      const endpoint: string = `/workerVacation`;
      return await post(`${authUrl}${endpoint}`, params);
    } catch (error) {
      return new ApiResponse(
        {} as IVacation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function createVacation(
    data: ICreateVacation
  ): Promise<ApiResponse<ICreateVacation>> {
    try {
      const endpoint: string = `/create`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ICreateVacation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function updateVacation(
    data: IEditVacation
  ): Promise<ApiResponse<IEditVacation>> {
    try {
      const endpoint: string = `/`;
      return await put(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IEditVacation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    getWorkerVacatioByParam,
    createVacation,
    updateVacation
  };
}

export default useVacationService;
