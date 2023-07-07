import * as yup from "yup";


export const formsPayroll = [
  yup.object({ prueba1: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
  yup.object({ prueba2: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
  yup.object({ prueba3: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
  yup.object({ prueba4: yup.string().min(8, "Ingrese al menos 8 caracteres") }),
];

const familiarSchema = {
  fullName: yup.string().required("Inserta un nombre").min(8, "Ingrese al menos 8 caracteres"),
};

export const familiarValidator = yup.object({
  familiar: yup.array().of(yup.object().shape(familiarSchema)),
});

