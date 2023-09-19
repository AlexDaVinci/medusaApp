import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Digite un email válido.")
		.required("El campo es requerido!"),
	password: Yup.string()
		.min(8, "Digite al menos 8 caracteres")
		.required("El campo es requerido!"),
});
