import { DateTime } from "luxon";

export interface IEmployment {
  id?: number;
  idCharge: string;
  institutionalMail: string;
  idTypeContract: string;
  contractNumber: string;
  startDate: DateTime;
  endDate: DateTime;
  specificObligations?: string;
  contractualObject?: string;
  state: string;
  settlementPaid?: string;
  idReasonRetirement: string;
  retirementDate?: DateTime;
  salary?: number;
  totalValue?: number;
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
  age: number;
  birthDate: DateTime;
  dependent: boolean;
}

export interface IWorker {
  id?: number;
  typeDocument: string;
  numberDocument: string;
  firstName: string;
  secondName?: string;
  surname: string;
  secondSurname?: string;
  birthDate: DateTime;
  gender: string;
  bloodType: string;
  nationality: string;
  email?: string;
  contactNumber: string;
  department: string;
  municipality: string;
  neighborhood: string;
  address: string;
  housingType?: string;
  socioEconomic?: string;
  fiscalIdentification?: string;
  eps?: string;
  severanceFund?: string;
  fundPension?: string;
  arl?: string;
  riskLevel?: string;
  bank?: string;
  accountBankType?: string;
  accountBankNumber?: string;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
  employment?: IEmployment;
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
  employment: IEmployment;
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
  codChargeType: number;
  baseSalary: number;
  state: boolean;
  observations?: string;
  typeCharge?: ITypesCharges;
  userModify?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface IChargeFilters {
  codChargeType?: number;
  name?: string;
  page: number;
  perPage: number;
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
  refund?: number;
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
  refund: number;
}

export interface IVacationResult {
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
  vacationDay?: IVacationDay[];
}

export interface IFilterIncapacity {
  workerId: string;
}

export interface IIncapacity {
  id?: number;
  codIncapacityType: number;
  codEmployment: number;
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

export interface IIncapacityTypes {
  id?: number;
  name?: string;
}

export interface IGetIncapacity extends IIncapacity {
  employment?: IEmploymentWorker;
  typeIncapacity: IIncapacityTypes | null;
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

export interface IEditVacation {
  id: number;
  idVacationDay: number;
  dateFrom: DateTime;
  dateUntil: DateTime;
  observation: string;
  available: number;
  refundTypes: number;
  refund: number;
  enjoyed: number;
  totalDays?: number;
  pendingTotalDays?: number;
}

export interface ILicence {
  id?: number;
  codEmployment: number;
  idLicenceType?: number;
  dateStart: DateTime;
  dateEnd: DateTime;
  totalDays?: number;
  licenceState: string;
  resolutionNumber: string;
  observation?: string;
  licenceType: ILicenceType;
  employment: IEmploymentWorker;
}
export interface ILicenceType {
  id?: number;
  name: string;
  numberDays: number;
  daysType: string;
}

export interface ILicenceFilters {
  codEmployment?: number;
  licenceState?: string;
  idLicenceType?: number;
  page: number;
  perPage: number;
}

export interface ILicenceResult {
  id?: number;
  codEmployment: number;
  idLicenceType?: number;
  dateStart: DateTime;
  dateEnd: DateTime;
  totalDays?: number;
  licenceState: string;
  resolutionNumber: string;
  observation?: string;
  employment?: IEmploymentResult;
  licenceType?: ILicenceType;
}

export interface IReasonsForWithdrawal {
  id: number;
  name: string;
}

export interface IRetirementEmployment {
  idReasonRetirement: string;
  retirementDate: DateTime;
  observation: string;
  idEmployment: number;
  state: string;
}

export interface ISalaryIncrement {
  id?: number;
  codCharge: number;
  effectiveDate: Date;
  numberActApproval: string;
  porcentualIncrement: boolean;
  incrementValue: number;
  previousSalary: number;
  newSalary: number;
  observation?: string;
  porcentualValue: number;
  charge?: ICharge;
}

export interface ISalaryIncrementFilter {
  codCharge?: number;
  numberActApproval?: string;
}

export interface ISalaryHistory {
  id?: number;
  codEmployment: number;
  codIncrement: number;
  previousSalary?: number;
  salary: number;
  validity: boolean;
  salaryIncrement: ISalaryIncrement;
  effectiveDate: DateTime;
  employment: IEmploymentWorker;
}

export interface IContractSuspension {
  id: number;
  document: string;
  names: string;
  surnames: string;
  typeContract: string;
  nroContract: string;
  dateStart: DateTime;
  dateEnd: DateTime;
  codEmployment: number;
  dateStartSuspension: DateTime;
  dateEndSuspension: DateTime;
  adjustEndDate: boolean;
  newDateEnd: DateTime;
  observation: string;
}

export interface IContractSuspensionData {
  id?: number;
  codEmployment: number;
  dateStart: DateTime;
  dateEnd: DateTime;
  adjustEndDate: boolean;
  newDateEnd: DateTime;
  observation: string;
  employment?: IEmploymentWorker;
}

export interface IFilterContractSuspension {
  codEmployment: number;
}

export interface IFormPeriod {
  id?: number;
  idFormType: number;
  state: string;
  dateStart: DateTime;
  dateEnd: DateTime;
  paidDate: DateTime;
  month: number;
  year: number;
  observation?: string;
  formsType?: IFormTypes;
}

export interface IDeductionsFilter {
  codEmployment?: number;
  typeDeduction?: string;
  codFormsPeriod?: number;
}

export interface IDeductionType {
  id: number;
  name: string;
  cyclic?: boolean;
  type?: string;
}

export interface IManualDeduction {
  id?: number;
  typeDeduction: string;
  codEmployment: number;
  codDeductionType?: number;
  cyclic: boolean;
  numberInstallments?: number;
  applyExtraordinary?: boolean;
  porcentualValue?: boolean;
  value: number;
  totalMount?: number;
  codFormsPeriod?: number;
  formsPeriod?: IFormPeriod;
  state: string;
  observation?: string;
  deductionsType?: IDeductionType;
  employment?: IEmploymentWorker;
}

export interface IFormPeriodFilters {
  idFormType?: number;
  state?: string;
  paidDate?: Date;
}

export interface IFormTypes {
  id?: number;
  special: boolean;
  name: string;
  frecuencyPaid: string;
}

export interface ITaxDeductible {
  id?: number;
  year: number;
  codEmployment: number;
  type: string;
  value: number;
  state: string;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface IGetTaxDeductible extends ITaxDeductible {
  employment: IEmploymentWorker;
}

export interface IFilterTaxDeductible {
  year: string;
  codEmployment: number;
}

export interface IOtherIncome {
  id?: number;
  codTypeIncome: number;
  codEmployment: number;
  codPayroll: number;
  value: number;
  state: string;
  valuesMax?: IParameter[];
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;
}

export interface IIncomeType {
  id: number;
  name: string;
  accountingAccount: string;
  type: string;
}

export interface IGetOtherIncome extends IOtherIncome {
  employment: IEmploymentWorker;
  incomeType: IIncomeType;
}

export interface IFilterOtherIncome {
  page: number;
  perPage: number;
  codPayroll: number | null;
  codEmployment: number | null;
}

export interface IParameter {
  id: string;
  name: string;
  description?: string;
  value: string;
  aplicationId: number;
}

export interface IDependence {
  id: number;
  name: string;
  depAbove: number;
}
