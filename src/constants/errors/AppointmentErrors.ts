export default {
  INVALID_FIELD: {
    status: 400,
    errorId: 'APPOINTMENT/INVALID_FIELD',
    message: 'Algum ou alguns dos parâmetros são invalidos.',
  },
  ALREADY_OCCUPIED: {
    status: 409,
    errorId: 'APPOINTMENT/ALREADY_OCCUPIED',
    message: 'Esta estacao de trabalho ja esta ocupada.',
  },
  OFFICE_NOT_FOUND: {
    status: 404,
    errorId: 'APPOINTMENT/OFFICE_NOT_FOUND',
    message: 'O escritório informado não existe.',
  },
  INVALID_DESK_ID: {
    status: 409,
    errorId: 'APPOINTMENT/INVALID_DESK_ID',
    message: 'A estação de trabalho informada é inválida.',
  },
  INVALID_DATE: {
    status: 409,
    errorId: 'APPOINTMENT/INVALID_DATE',
    message: 'A data informada não é válida.',
  },
  APPOINTMENT_ALREADY_EXISTS: {
    status: 409,
    errorId: 'APPOINTMENT/APPOINTMENT_ALREADY_EXISTS',
    message: 'Já existe um agendamento para esta data na sua conta.',
  },
};
