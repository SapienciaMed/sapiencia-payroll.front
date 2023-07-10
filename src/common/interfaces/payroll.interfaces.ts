import { DateTime } from "luxon";

export interface IEmployment {
  idCharge: number;
  contractNumber: string;
  startDate: DateTime;
  endDate: DateTime;
  state: string;
  idReasonRetirement: number;
  userModified: string;
  dateModified?: DateTime;
  userCreate: string;
  dateCreate?: DateTime;
}

export interface IRelative {
  name: string;
  relationship: string;
  gender: string;
  birthDate: DateTime;
}

export interface IWorker {
  typeDocument: string;
  numberDocument: string;
  firstName: string;
  secondName?: string;
  surName: string;
  secondSurname?: string;
  gender: string;
  bloodType: string;
  birthDate: Date | string;
  nationality: string;
  email?: string;
  contactNumber: string;
  department: string;
  municipality: string;
  neighborhood: string;
  address: string;
  socioEconomic?: string;
  eps?: string;
  severanceFund?: string;
  arl?: string;
  riskLevel?: string;
  housingType?: string;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface ICreateWorker {
  worker: IWorker;
  relatives: IRelative[];
  employment: IEmployment;
}

export interface ITypesContracts {
  id: number;
  name: string;
  temporary: boolean;
}

export interface ITypesCharges{
  id: number;
  name: string;
  }
