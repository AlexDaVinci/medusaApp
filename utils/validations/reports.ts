import * as Yup from "yup";

export const reportValidationSchema = Yup.object().shape({
	incidentType: Yup.string().required("El Tipo de Incidente es requerido"),
	address: Yup.string().required("La dirección es requerida"),
	photoSee: Yup.string().required("La foto es requerida"),
	// description: Yup.string()
	// 	.required("La descripción es requerida")
	// 	.min(8, "Digite al menos 8 caracteres"),
	description: Yup.string().required("La descripción es requerida"),
});
