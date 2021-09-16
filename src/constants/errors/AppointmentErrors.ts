export default {
  ALREADY_OCCUPIED: {
    status: 409,
    errorId: 'APPOINTMENT/ALREADY_OCCUPIED',
    message: 'Esta estacao de trabalho ja esta ocupada.',
  },
  APPOINTMENT_ALREADY_EXISTS: {
    status: 409,
    errorId: 'APPOINTMENT/APPOINTMENT_ALREADY_EXISTS',
    message: 'Já existe um agendamento para esta data na sua conta.',
  },
  DESK_IS_UNAVAILABLE: {
    status: 401,
    errorId: 'APPOINTMENT/DESK_IS_UNAVAILABLE',
    message: 'A estação de trabalho está desabilitada.',
  },
};
