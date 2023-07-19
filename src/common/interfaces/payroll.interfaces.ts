import { DateTime } from "luxon";

export interface IEmployment {
  idCharge: string;
  institutionalMail: string;
  idTypeContract: string;
  contractNumber: string;
  startDate: DateTime;
  endDate: DateTime;
  state: string;
  observation?:string;
  salary?:number;
  totalValue?:number;
  idReasonRetirement: string;
  charges?: ICharge[]
  typesContracts?: ITypesContracts[]
}

export interface IRelative {
  name: string;
  relationship: string;
  gender: string;
  birthDate: DateTime;
}

export interface IWorker {
  id?: number;
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
  fundPension?: string;
  bank?: string;
  accountType?: string;
  accountNumber?: string;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface IVinculation {
  worker: IWorker;
  relatives: IRelative[];
  employment: IEmployment;
}

export interface IGetVinculation {
  id?: number;
  typeDocument: string;
  numberDocument: string;
  firstName: string;
  secondName?: string;
  surname: string;
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
  fundPension?: string;
  bank?: string;
  accountType?: string;
  accountNumber?: string;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
  employment: {
    idCharge: string;
    institutionalMail: string;
    idTypeContract: string;
    contractNumber: string;
    startDate: DateTime;
    endDate: DateTime;
    state: string;
    idReasonRetirement: string;
    typesContracts?: ITypesContracts[];
  };
}

export interface ITypesContracts {
  id: number;
  name: string;
  temporary: boolean;
}

export interface ITypesCharges {
  id: number;
  name: string;
}

export interface ICharge {
  id?: number;
  name?: string;
  codUnit: number;
  codChargeType: number;
  baseSalary: number;
  state: string;
  userModify?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface IFilterVinculation {
  page: number;
  perPage: number;
  documentNumber?: number;
  state?: string;
  vinculationType?: string;
  name?: string;
  lastName?: string;
}

export interface IFilterVinculation {
  page: number;
  perPage: number;
  id?:number;
}