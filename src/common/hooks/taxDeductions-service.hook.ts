import { EResponseCodes } from "../constants/api.enum";

import {
  ITaxDeductible,
  IGetTaxDeductible,
} from "../interfaces/payroll.interfaces";

import { ApiResponse } from "../utils/api-response";

import useCrudService from "./crud-service.hook";

export function useTaxDeductionService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/taxDeductible";

  const { get, post, put } = useCrudService(baseURL);

  async function createTaxDeductible(
    data: ITaxDeductible
  ): Promise<ApiResponse<ITaxDeductible>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ITaxDeductible,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function updateTaxDeductible(
    data: ITaxDeductible
  ): Promise<ApiResponse<ITaxDeductible>> {
    try {
      const endpoint: string = `/`;
      return await put(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ITaxDeductible,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getByIdTaxDeductible(
    id: number
  ): Promise<ApiResponse<IGetTaxDeductible>> {
    try {
      const endpoint: string = `/`;
      return await get(`${authUrl}${endpoint}${id}`);
    } catch (error) {
      return new ApiResponse(
        {} as IGetTaxDeductible,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    createTaxDeductible,
    updateTaxDeductible,
    getByIdTaxDeductible,
  };
}

export default useTaxDeductionService;
