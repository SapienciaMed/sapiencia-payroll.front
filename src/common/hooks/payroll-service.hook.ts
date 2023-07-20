import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces";
import {
  ICharge,
  IVinculation,
  ITypesContracts,
} from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function usePayrollService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/employment";

  const { get, post, put} = useCrudService(null, baseURL);

  async function getVinculationById(id:number): Promise<ApiResponse<IVinculation>> {
    try {
      const endpoint: string = `/`;
      return await get(`${authUrl}${endpoint}${id}`);
    } catch (error) {
      return new ApiResponse(
        {} as IVinculation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

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

  async function createWorker(
    data: IVinculation
  ): Promise<ApiResponse<IVinculation>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IVinculation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function updateWorker(
    data: IVinculation
  ): Promise<ApiResponse<IVinculation>> {
    try {
      const endpoint: string = `/`;
      return await put(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IVinculation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }
  return {
    getTypesContracts,
    getCharges,
    createWorker,
    getVinculationById,
    updateWorker
  };
}

export default usePayrollService;
