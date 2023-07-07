import * as yup from "yup";

const personalInformationLocalization = yup.object({
  //datospersonales
  typeDocument: yup.string().required("El campo es obligatorio"),
  numberDocument: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten numeros")
    .min(5, "Ingrese al menos 5 caracteres")
    .max(15, "Solo se permiten 15 caracteres")
    .required("El campo es obligatorio"),
  firstName: yup
    .string()
    .required("El campo es obligatorio")
    .min(3, "Ingrese al menos 3 caracteres")
    .max(50, "Solo se permiten 50 caracteres"),
  secondName: yup.string().max(50, "Solo se permiten 50 caracteres"),
  surName: yup
    .string()
    .min(3, "Ingrese al menos 3 caracteres")
    .max(50, "Solo se permiten 50 caracteres")
    .required("El campo es obligatorio"),
  secondSurName: yup.string().max(50, "Solo se permiten 50 caracteres"),
  gender: yup.string().required("El campo es obligatorio"),
  bloodType: yup.string().required("El campo es obligatorio"),
  birthDate: yup.date().required("El campo es obligatorio"),
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
});

const familiarSchema = {
  fullName: yup
    .string()
    .required("Inserta un nombre")
    .min(8, "Ingrese al menos 8 caracteres"),
};

export const familiarValidator = yup.object({
  familiar: yup.array().of(yup.object().shape(familiarSchema)),
});

export const formsPayroll = [
  personalInformationLocalization,
  yup.object({ prueba2: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
  yup.object({ prueba3: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
  yup.object({ prueba4: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
];
