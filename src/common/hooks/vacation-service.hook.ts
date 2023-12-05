import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces";
import {
  ICreateVacation,
  IEditVacation,
  IVacation,
  IVacationDay,
  IVacationPeriods,
  IVacationResult,
} from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useVacationService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/vacations";

  const { get, post, put } = useCrudService(baseURL);

  async function getWorkerVacatioByParam(
    params
  ): Promise<ApiResponse<IVacationResult>> {
    try {
      const endpoint: string = `/workerVacation`;
      return await post(`${authUrl}${endpoint}`, params);
    } catch (error) {
      return new ApiResponse(
        {} as IVacationResult,
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

  async function getPeriodVacationByEmployment(): Promise<
    ApiResponse<IVacationPeriods[]>
  > {
    try {
      const endpoint: string = `/periods`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        [{}] as IVacationPeriods[],
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
    updateVacation,
    getPeriodVacationByEmployment,
  };
}

export default useVacationService;
