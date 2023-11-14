import { get } from "react-hook-form";
import { EResponseCodes } from "../constants/api.enum";

import { ICharge, ITypesCharges } from "../interfaces/payroll.interfaces";

import { ApiResponse } from "../utils/api-response";

import useCrudService from "./crud-service.hook";

export function useChargesService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/charges";

  const { post, put,get } = useCrudService(baseURL);

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

  async function getChargeById(id: number): Promise<ApiResponse<ICharge>> {
    try {
      const endpoint: string = `/${id}`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as ICharge,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getTypesChargeList(): Promise<ApiResponse<ITypesCharges[]>> {
    try {
      const endpoint: string = `/types`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as ITypesCharges[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    createCharge,
    updateCharge,
    getChargeById,
    getTypesChargeList,
  };
}

export default useChargesService;
