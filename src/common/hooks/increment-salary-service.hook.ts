import { EResponseCodes } from "../constants/api.enum";

import { ISalaryIncrement } from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";

import useCrudService from "./crud-service.hook";

export function useIncrementSalaryService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/salaryIncrease";

  const { get, post, put } = useCrudService(null, baseURL);

  async function createIncrementSalary(
    data: ISalaryIncrement
  ): Promise<ApiResponse<ISalaryIncrement>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ISalaryIncrement,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function updateIncrementSalary(
    data: ISalaryIncrement
  ): Promise<ApiResponse<ISalaryIncrement>> {
    try {
      const endpoint: string = `/`;
      return await put(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ISalaryIncrement,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getByIdIncrementSalary(
    id: number
  ): Promise<ApiResponse<ISalaryIncrement>> {
    try {
      const endpoint: string = `/`;
      return await get(`${authUrl}${endpoint}${id}`);
    } catch (error) {
      return new ApiResponse(
        {} as ISalaryIncrement,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    createIncrementSalary,
    getByIdIncrementSalary,
    updateIncrementSalary,
  };
}

export default useIncrementSalaryService;
