export default {
  INVALID_FIELD: {
		status: 400,
		errorId: "APPOINTMENT/INVALID_FIELD",
		message: "Algum ou alguns dos parâmetros são invalidos."
  },
	ALREADY_OCCUPIED: {
		status: 409,
		errorId: "APPOINTMENT/ALREADY_OCCUPIED",
		message: "Esta estacao de trabalho ja esta ocupada."
	}
}