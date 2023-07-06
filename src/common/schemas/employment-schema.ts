import * as yup from "yup";

export const loginValidator = yup.object({
  numberDocument: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten numeros")
    .max(15, "Solo se permiten 15 caracteres")
    .required("El numero de documento es obligatorio"),
  password: yup
    .string()
    .min(7, "Ingrese al menos 7 caracteres")
    .required("La contraseña es obligatoria"),
});

export const recoveryPassword = yup.object({
  numberDocument: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten numeros")
    .required("El numero de documento es obligatorio"),
  email: yup
    .string()
    .email("Correo no valido")
    .required("El correo es obligatorio"),
});

export const formsPayroll = [
  yup.object({
    numberDocument: yup
      .string()
      .matches(/^[0-9]+$/, "Solo se permiten numeros")
      .min(5, "Ingrese al menos 5 caracteres")
      .max(15, "Solo se permiten 15 caracteres")
      .required("El campo es obligatorio"),
    firstName: yup
      .string()
      .min(3, "Ingrese al menos 3 caracteres")
      .max(50, "Solo se permiten 50 caracteres")
      .required("El campo es obligatorio"),
    secondName: yup.string().max(50, "Solo se permiten 50 caracteres"),
    surName: yup
      .string()
      .min(3, "Ingrese al menos 3 caracteres")
      .max(50, "Solo se permiten 50 caracteres")
      .required("El campo es obligatorio"),
    secondSurName: yup.string().max(50, "Solo se permiten 50 caracteres"),
    gender: yup.string().required("El campo es obligatorio"),
    bloodType: yup.string().required("El campo es obligatorio"),
  }),
  yup.object({ prueba2: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
  yup.object({ prueba3: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
  yup.object({ prueba4: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
];

export const changePassword = yup.object({
  password: yup
    .string()
    .min(8, "Ingrese al menos 8 caracteres")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número.")
    .required("La contraseña es obligatoria."),
  confirmPassword: yup
    .string()
    .min(8, "Ingrese al menos 8 caracteres")
    .required("La contraseña es obligatoria.")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número.")
    .oneOf(
      [yup.ref("password")],
      "Las contraseñas no coinciden, por favor verificar la información."
    ),
});

export const roleValidator = yup.object({
  nombreRol: yup.string().required("Inserta un nombre"),
  descripcionRol: yup.string().required("Inserta una descripción"),
});
