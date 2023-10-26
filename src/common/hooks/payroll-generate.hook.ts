import { EResponseCodes } from "../constants/api.enum";
import { IIncomeType } from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function usePayrollGenerate() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/payroll-generate";

  const { get } = useCrudService(baseURL);

  async function generatePayroll(id: number): Promise<ApiResponse<any>> {
    try {
      const endpoint: string = `/generate-by-id/${id}`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(false, EResponseCodes.FAIL, "Error no controlado");
    }
  }
  async function downloadPayroll(id: number): Promise<ApiResponse<any>> {
    try {
      const endpoint: string = `/download/${id}`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(false, EResponseCodes.FAIL, "Error no controlado");
    }
  }

  async function getIncomeTypeByType(
    type: string
  ): Promise<ApiResponse<IIncomeType[]>> {
    try {
      const endpoint: string = `/incomeType`;
      return await get(`${authUrl}${endpoint}`, { type });
    } catch (error) {
      return new ApiResponse(
        {} as IIncomeType[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }
  return {
    generatePayroll,
  };
}

export default usePayrollGenerate;
