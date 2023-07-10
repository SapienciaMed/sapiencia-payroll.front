import * as yup from "yup";

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
      .max(50, "Solo se permiten 50 caracteres"),
    surName: yup
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
      .typeError("Fecha invalida"),
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

const familiarSchema = {
  name: yup
    .string()
    .required("Inserta un nombre")
    .min(8, "Ingrese al menos 8 caracteres"),
};

export const familiarValidator = yup.object({
  familiar: yup.array().of(yup.object().shape(familiarSchema)),
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
  }),
});

export const formsPayroll = [
  personalInformationLocalization,
  yup.object({}),
  contractualInformation,
  yup.object({ prueba4: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
];
