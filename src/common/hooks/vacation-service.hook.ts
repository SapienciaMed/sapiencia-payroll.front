import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces";
import {
  IVacation
} from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useVacationService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/vacations";

  const { get, post, put} = useCrudService(null, baseURL);

  async function getWorkerVacatioByParam(params): Promise<ApiResponse<IVacation>> {
    try {
      const endpoint: string = `/workerVacation`;
      return await post(`${authUrl}${endpoint}`,params);
    } catch (error) {
      return new ApiResponse(
        {} as IVacation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

 


  return {
    getWorkerVacatioByParam,
  };
}

export default useVacationService;
