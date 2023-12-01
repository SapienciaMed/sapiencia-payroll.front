import { EResponseCodes } from "../constants/api.enum";
import {
  ICharge,
  IVinculation,
  ITypesContracts,
  IWorker,
  IEmployment,
  IReasonsForWithdrawal,
  IEmploymentWorker,
  IRetirementEmployment,
  IContractSuspensionData,
  IFormPeriod,
  IFormTypes,
  IHistoricalPayroll,
} from "../interfaces/payroll.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function usePayrollService() {
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/vinculation";
  const payrollUrl: string = "/api/v1/payroll";

  const { get, post, put } = useCrudService(baseURL);

  async function getVinculationById(
    id: number
  ): Promise<ApiResponse<IVinculation>> {
    try {
      const endpoint: string = `/`;
      return await get(`${authUrl}${endpoint}${id}`);
    } catch (error) {
      return new ApiResponse(
        {} as IVinculation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getTypesContracts(): Promise<ApiResponse<ITypesContracts[]>> {
    try {
      const endpoint: string = `/typesContracts`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as ITypesContracts[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getCharges(): Promise<ApiResponse<ICharge[]>> {
    try {
      const endpoint: string = `/charges`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as ICharge[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getWorkers(
    temporary: boolean
  ): Promise<ApiResponse<IWorker[]>> {
    try {
      const endpoint: string = `/worker`;
      return await get(`${authUrl}${endpoint}`, { temporary });
    } catch (error) {
      return new ApiResponse(
        {} as IWorker[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getContractors(): Promise<ApiResponse<IWorker[]>> {
    try {
      const endpoint: string = `/contractors`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IWorker[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getInactiveWorkers(): Promise<ApiResponse<IWorker[]>> {
    try {
      const endpoint: string = `/inactiveWorker`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IWorker[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function createWorker(
    data: IVinculation
  ): Promise<ApiResponse<IVinculation>> {
    try {
      const endpoint: string = `/`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IVinculation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function updateWorker(
    data: IVinculation
  ): Promise<ApiResponse<IVinculation>> {
    try {
      const endpoint: string = `/`;
      return await put(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IVinculation,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getEmploymentById(
    id: number
  ): Promise<ApiResponse<IEmploymentWorker[]>> {
    try {
      const endpoint: string = `/employment`;
      return await get(`${authUrl}${endpoint}/${id}`);
    } catch (error) {
      return new ApiResponse(
        {} as IEmploymentWorker[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getReasonsForWithdrawal(): Promise<
    ApiResponse<IReasonsForWithdrawal[]>
  > {
    try {
      const endpoint: string = `/reasonsForWithdrawal`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IReasonsForWithdrawal[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function retirementEmployment(
    data: IRetirementEmployment
  ): Promise<ApiResponse<IEmployment>> {
    try {
      const endpoint: string = `/employment/retirement`;
      return await put(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IEmployment,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function createSuspensionContract(
    data: IContractSuspensionData
  ): Promise<ApiResponse<IEmployment>> {
    try {
      const endpoint: string = `/suspension`;
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IEmployment,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getLastPeriods(
    id: number
  ): Promise<ApiResponse<IFormPeriod[]>> {
    try {
      const endpoint: string = `/last/${id}`;
      return await get(`${payrollUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IFormPeriod[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getPeriods(): Promise<ApiResponse<IFormPeriod[]>> {
    try {
      const endpoint: string = `/available`;
      return await get(`${payrollUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IFormPeriod[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getTypeSpreadSheet(): Promise<ApiResponse<IFormTypes[]>> {
    try {
      const endpoint: string = `/types`;
      return await get(`${payrollUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IFormTypes[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function createSpreadSheet(
    data: IFormPeriod
  ): Promise<ApiResponse<IFormPeriod>> {
    try {
      const endpoint: string = `/`;
      return await post(`${payrollUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IFormPeriod,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function updateSpreadSheet(
    data: IFormPeriod
  ): Promise<ApiResponse<IFormPeriod>> {
    try {
      const endpoint: string = `/`;
      return await put(`${payrollUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IFormPeriod,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getByIdSpreadSheet(
    id: number
  ): Promise<ApiResponse<IFormPeriod>> {
    try {
      const endpoint: string = `/${id}`;
      return await get(`${payrollUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IFormPeriod,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getEmploymentsByPayroll(
    idPayroll: number
  ): Promise<ApiResponse<IEmploymentWorker[]>> {
    try {
      const endpoint: string = `/employmentByPayroll/`;
      return await get(`${authUrl}${endpoint}${idPayroll}`);
    } catch (error) {
      return new ApiResponse(
        {} as IEmploymentWorker[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    getTypesContracts,
    getCharges,
    createWorker,
    getVinculationById,
    updateWorker,
    getWorkers,
    getEmploymentById,
    getReasonsForWithdrawal,
    retirementEmployment,
    createSuspensionContract,
    getLastPeriods,
    getPeriods,
    getTypeSpreadSheet,
    createSpreadSheet,
    updateSpreadSheet,
    getByIdSpreadSheet,
    getContractors,
    getEmploymentsByPayroll,
    getInactiveWorkers,
  };
}

export default usePayrollService;
