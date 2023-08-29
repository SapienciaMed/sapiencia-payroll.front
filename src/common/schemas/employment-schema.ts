import * as yup from "yup";
import { calculateLimiteEdad, calculateMayorEdad } from "../utils/helpers";

const personalInformationLocalization = yup.object({
  worker: yup.object({
    //datospersonales
    typeDocument: yup.string().required("El campo es obligatorio"),
    numberDocument: yup
      .string()
      .required("El campo es obligatorio")
      .matches(/^[0-9]+$/, "Solo se permiten numeros")
      .min(5, "Ingrese al menos 5 caracteres")
      .max(15, "Solo se permiten 15 caracteres"),
    firstName: yup
      .string()
      .required("El campo es obligatorio")
      .min(3, "Ingrese al menos 3 caracteres")
      .max(50, "Solo se permiten 50 caracteres"),
    secondName: yup
      .string()
      .optional()
      .nullable()
      .max(50, "Solo se permiten 50 caracteres"),
    surname: yup
      .string()
      .required("El campo es obligatorio")
      .min(3, "Ingrese al menos 3 caracteres")
      .max(50, "Solo se permiten 50 caracteres"),
    secondSurName: yup
      .string()
      .optional()
      .max(50, "Solo se permiten 50 caracteres"),
    gender: yup.string().required("El campo es obligatorio"),
    bloodType: yup.string().required("El campo es obligatorio"),
    birthDate: yup
      .date()
      .required("El campo es obligatorio")
      .typeError("Fecha invalida")
      .test("mayor-edad", "Debe ser mayor de edad", calculateMayorEdad)
      .test("limite-edad", "Debe ser menor de 80 años", calculateLimiteEdad),
    nationality: yup.string().required("El campo es obligatorio"),
    //localizacion
    department: yup.string().required("El campo es obligatorio"),
    municipality: yup.string().required("El campo es obligatorio"),
    address: yup
      .string()
      .max(100, "Solo se permiten 100 caracteres")
      .required("El campo es obligatorio"),
    neighborhood: yup.string().required("El campo es obligatorio"),
    contactNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Solo se permiten numeros")
      .max(10, "Solo se permiten 10 caracteres")
      .required("El campo es obligatorio"),
  }),
});

export const familiarValidator = yup.object().shape({
  familiar: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .required("El campo es obligatorio")
        .min(8, "Ingrese al menos 8 caracteres"),
      relationship: yup
        .string()
        .required("El campo es obligatorio")
        .max(10, "Ingrese al menos 10 caracteres"),
    })
  ),
});

const contractualInformation = yup.object({
  employment: yup.object({
    idTypeContract: yup.string().required("El campo es obligatorio"),
    contractNumber: yup
      .string()
      .required("El campo es obligatorio")
      .max(10, "Solo se permiten 10 caracteres"),
    state: yup.string().required("El campo es obligatorio"),
    idCharge: yup.string().required("El campo es obligatorio"),
    startDate: yup
      .date()
      .required("El campo es obligatorio")
      .typeError("Fecha invalida"),
    endDate: yup
      .date()
      .required("El campo es obligatorio")
      .typeError("Fecha invalida"),
    institutionalMail: yup
      .string()
      .required("El campo es obligatorio")
      .email("El correo es invalido"),
    totalValue: yup.string().optional().nullable(),
  }),
});

const afiliaciones = yup.object({
  worker: yup.object({
    //eps: yup.string().required("El campo es obligatorio"),
    //fundPension: yup.string().required("El campo es obligatorio"),
    //arl: yup.string().required("El campo es obligatorio"),
    //riskLevel: yup.string().required("El campo es obligatorio"),
    //severanceFund: yup.string().required("El campo es obligatorio"),
  }),
});

export const searchRecord = yup.object({
  idWorker: yup.number().required("Seleccionar colaborador es obligatorio"),
  period: yup.number().required("Seleccionar un periodo es obligatorio"),
});

export const formsPayroll = [
  personalInformationLocalization,
  yup.object({}),
  contractualInformation,
  afiliaciones,
];

export const createAndUpdateIncapacity = yup.object({
  codEmployment: yup.string().required("El campo es obligatorio"),
  codIncapacityType: yup.string().required("El campo es obligatorio"),
  dateInitial: yup
    .date()
    .required("El campo es obligatorio")
    .typeError("Fecha invalida"),
  dateFinish: yup
    .date()
    .required("El campo es obligatorio")
    .typeError("Fecha invalida"),
  // comments: yup.string().required("El campo es obligatorio"),
});

export const createLicenceSchema = yup.object({
  codEmployment: yup.string().required("El campo es obligatorio"),
  idLicenceType: yup.string().required("El campo es obligatorio"),
  dateStart: yup.string().required("El campo es obligatorio"),
  dateEnd: yup.string().required("El campo es obligatorio"),
  licenceState: yup.string().required("El campo es obligatorio"),
  resolutionNumber: yup
    .string()
    .required("El campo es obligatorio")
    .max(50, "máximo 50 carácteres"),
  observation: yup.string().optional().max(500, "máximo 500 carácteres"),
});
// comments: yup.string().required("El campo es obligatorio"),
export const searchStaff = yup.object({
  workerId: yup.string().required("El campo es obligatorio"),
});

export const retirementEmploymentSchema = yup.object({
  idReasonRetirement: yup.string().required("El campo es obligatorio"),
  retirementDate: yup
    .date()
    .required("El campo es obligatorio")
    .typeError("Fecha invalida"),
  observation: yup
    .string()
    .required("El campo es obligatorio")
    .min(3, "Ingrese al menos 3 caracteres")
    .max(1000, "Solo se permiten 1000 caracteres"),
});

export const filterIncrementSalarySchema = yup.object({
  numberActApproval: yup.string().required("El campo es obligatorio"),
});

export const createUpdateIncrementSalarySchema = yup.object({
  codCharge: yup.string().required("El campo es obligatorio"),
  previousSalary: yup.string(),
  numberActApproval: yup
    .string()
    .required("El campo es obligatorio")
    .max(100, "Solo se permiten 100 caracteres"),
  newSalary: yup
    .string()
    .required("El campo es obligatorio")
    .test(
      "mayor-salaryActual",
      "El nuevo salario debe ser mayor al salario actual",
      (value, context) => {
        const { previousSalary } = context.parent;
        if (value && previousSalary) {
          return parseFloat(value) >= parseFloat(previousSalary);
        }
        return true;
      }
    ),
  effectiveDate: yup
    .date()
    .required("El campo es obligatorio")
    .typeError("Fecha invalida"),
  incrementValue: yup
    .string()
    .required("El campo es obligatorio")
    .test(
      "incremento-valido",
      "Debe existir un incremento valido",
      (value, context) => {
        if (value) {
          return Number(value) <= 0 ? false : true;
        }
        return true;
      }
    ),
  observation: yup.string().max(500, "Solo se permiten 500 caracteres"),
});
