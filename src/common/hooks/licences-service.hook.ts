import { EResponseCodes } from "../constants/api.enum";
import {  ILicence } from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useLicencesService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/licence";

  const { get, post, put } = useCrudService(null, baseURL);

  
  async function createLicence(
    data: ILicence
  ): Promise<ApiResponse<ILicence>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as ILicence,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }


  return {
    createLicence,
  };
}

export default useLicencesService;
