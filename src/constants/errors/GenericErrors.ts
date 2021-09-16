export default {
  MISSING_FIELD: {
    status: 400,
    errorId: 'GENERIC/MISSING_FIELD',
    message: 'Um parâmetro obrigatório não foi enviado.',
  },
  INVALID_FIELD: {
    status: 400,
    errorId: 'GENERIC/INVALID_FIELD',
    message: 'Um dos parâmetros está no formato incorreto.',
  },
};
