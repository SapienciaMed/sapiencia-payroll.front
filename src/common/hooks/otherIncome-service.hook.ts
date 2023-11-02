import { EResponseCodes } from "../constants/api.enum";

import {
  IOtherIncome,
  IGetOtherIncome,
} from "../interfaces/payroll.interfaces";

import { ApiResponse } from "../utils/api-response";

import useCrudService from "./crud-service.hook";

export function useOtherIncomeService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/otherIncome";

  const { get, post, put } = useCrudService(baseURL);

  async function createOtherIncome(
    data: IOtherIncome
  ): Promise<ApiResponse<IOtherIncome>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IOtherIncome,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function updateOtherIncome(
    data: IOtherIncome
  ): Promise<ApiResponse<IOtherIncome>> {
    try {
      const endpoint: string = `/`;
      return await put(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IOtherIncome,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getByIdOtherIncome(
    id: number
  ): Promise<ApiResponse<IGetOtherIncome>> {
    try {
      const endpoint: string = `/`;
      return await get(`${authUrl}${endpoint}${id}`);
    } catch (error) {
      return new ApiResponse(
        {} as IGetOtherIncome,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    createOtherIncome,
    updateOtherIncome,
    getByIdOtherIncome,
  };
}

export default useOtherIncomeService;
