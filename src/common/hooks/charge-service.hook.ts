import { EResponseCodes } from "../constants/api.enum";
import { ICharge, IDependence } from "../interfaces/payroll.interfaces";

import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useChargeService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/charges";

  const { get, post, put } = useCrudService(baseURL);

  async function createCharge(data: ICharge): Promise<ApiResponse<ICharge>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ICharge,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function updateCharge(data: ICharge): Promise<ApiResponse<ICharge>> {
    try {
      const endpoint: string = `/`;
      return await put(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ICharge,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getChargeById(id: number): Promise<ApiResponse<ICharge[]>> {
    try {
      const endpoint: string = `/${id}`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as ICharge[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    createCharge,
    updateCharge,
    getChargeById,
  };
}

export default useChargeService;
