import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces";
import { ICreateWorker, ITypesCharges, ITypesContracts } from "../interfaces/payroll.interfaces";
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

  async function getTypesCharges(): Promise<ApiResponse<ITypesCharges[]>> {
    try {
      const endpoint: string = `/typesCharges`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as ITypesCharges[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function createWorker(data): Promise<ApiResponse<ICreateWorker>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`,data);
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
    getTypesCharges,
    createWorker
  };
}

export default usePayrollService;
