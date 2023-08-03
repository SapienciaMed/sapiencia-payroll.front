import { EResponseCodes } from "../constants/api.enum";

import {
  IIncapacity,
  IIncapacityTypes,
} from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";

import useCrudService from "./crud-service.hook";

export function useIncapacityService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/incapacity";

  const { get, post, put } = useCrudService(null, baseURL);

  async function createIncapacity(
    data: IIncapacity
  ): Promise<ApiResponse<IIncapacity>> {
    try {
      const endpoint: string = `/create`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IIncapacity,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function typeIncapacity(): Promise<ApiResponse<IIncapacityTypes[]>> {
    try {
      const endpoint: string = `/incapacity-types`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IIncapacityTypes[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    createIncapacity,
    typeIncapacity,
  };
}

export default useIncapacityService;
