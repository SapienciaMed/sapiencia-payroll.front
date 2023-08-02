import { DateTime } from "luxon";

export interface IEmployment {
  idCharge: string;
  institutionalMail: string;
  idTypeContract: string;
  contractNumber: string;
  startDate: DateTime;
  endDate: DateTime;
  state: string;
  observation?: string;
  salary?: number;
  totalValue?: number;
  idReasonRetirement: string;
  charges?: ICharge[];
  typesContracts?: ITypesContracts[];
}

export interface IEmploymentResult {
  idCharge: string;
  institutionalMail: string;
  idTypeContract: string;
  contractNumber: string;
  startDate: DateTime;
  endDate: DateTime;
  state: string;
  observation?: string;
  salary?: number;
  totalValue?: number;
  idReasonRetirement: string;
  charges?: ICharge[];
  typesContracts?: ITypesContracts[];
  worker?: IWorker;
}

export interface IEmploymentWorker extends IEmployment {
  worker: IWorker;
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

export interface IFilterEmployment {
  page: number;
  perPage: number;
  id?: number;
}

export interface IFilterVacation {
  page: number;
  perPage: number;
  workerId?: string;
  period?: string;
}

export interface IWorkersVacation {
  id?: number;
  documentWorker: string;
  idWorker: number;
  nameWorker?: string;
  period: string;
  startDate: DateTime;
  endDate: DateTime;
  startDateCompensatedDays: DateTime;
  totalCompensatoryDays: number;
  observation: string;
  charge?: string;
  salary?: number;
  refundDays?: number;
  previousBalance?: number;
  daysEarned?: number;
  currentBalance?: number;
  endingPeriod?: boolean;
  pendingDays?: number;
  checkCompensatoryDays?: boolean;
  checkEnjoyedDays?: boolean;
  totalDaysEnjoyed?: number;
}

export interface IWorkersVacationDetail {
  id?: number;
  codEmployment: string;
  period: string;
  dateFrom: DateTime;
  dateUntil: DateTime;
  periodFormer: string;
  enjoyed: string;
  available: number;
  days: string;
  periodClosed: boolean;
  employment?: IEmploymentResult;
  vacationDay: IVacationDay[];
}

export interface IVacation {
  id?: number;
  codEmployment: string;
  period: string;
  dateFrom: DateTime;
  dateUntil: DateTime;
  periodFormer: string;
  enjoyed: string;
  available: number;
  days: string;
  periodClosed: boolean;
}

export interface IFilterIncapacity {
  workerId: string;
}

export interface IIncapacity {
  id?: number;
  codIncapacityType: number;
  codEmployee: number;
  dateInitial: DateTime;
  dateFinish: DateTime;
  comments?: string;
  isExtension?: boolean;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface IFilterIncapacity {
  idEmployee?: number;
}
export interface IVacationDay {
  id?: number;
  codVacation: number;
  dateFrom: DateTime;
  dateUntil: DateTime;
  enjoyedDays: number;
  paid: boolean;
  codForm?: number;
  observation?: string;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface ICreateVacation {
  vacationDay: IVacationDay[];
}

export interface IVacationDay {
  id?: number;
  codVacation: number;
  dateFrom: DateTime;
  dateUntil: DateTime;
  enjoyedDays: number;
  paid: boolean;
  codForm?: number;
  observation?: string;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface ICreateVacation {
  vacationDay: IVacationDay[];
}

export interface IIncapacityTypes {
  id?: number;
  name?: string;
}

export interface IGetIncapacity extends IIncapacity {
  employment?: IEmploymentWorker;
  typeIncapacity: IIncapacityTypes | null;
}
