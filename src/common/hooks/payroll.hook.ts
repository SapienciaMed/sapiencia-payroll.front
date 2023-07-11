import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces";
import {
  ICharge,
  ICreateWorker,
  ITypesContracts,
} from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function usePayrollService() {
  const baseURL: string = "http://localhost:4203";
  const authUrl: string = "/api/v1/employment";

  const { get, post } = useCrudService(null, baseURL);

  async function getTypesContracts(): Promise<ApiResponse<ITypesContracts[]>> {
    try {
      const endpoint: string = `/typesContracts`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as ITypesContracts[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getCharges(): Promise<ApiResponse<ICharge[]>> {
    try {
      const endpoint: string = `/charges`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as ICharge[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function createWorker(data:ICreateWorker): Promise<ApiResponse<ICreateWorker>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ICreateWorker,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    getTypesContracts,
    getCharges,
    createWorker,
  };
}

export default usePayrollService;
