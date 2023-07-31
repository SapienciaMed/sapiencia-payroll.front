import { EResponseCodes } from "../constants/api.enum";

import { IIncapacity } from "../interfaces/payroll.interfaces";
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
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IIncapacity,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    createIncapacity,
  };
}

export default useIncapacityService;
