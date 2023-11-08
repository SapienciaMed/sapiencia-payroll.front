import { EResponseCodes } from "../constants/api.enum";
import { IDependence } from "../interfaces/payroll.interfaces";

import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useDependenceService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/dependence";

  const { get, post, put } = useCrudService(baseURL);

  async function getDependences(): Promise<ApiResponse<IDependence[]>> {
    try {
      const endpoint: string = `/get-all`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IDependence[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    getDependences,
  };
}

export default useDependenceService;
