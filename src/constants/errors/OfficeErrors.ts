export default {
  MISSING_FIELDS: {
    status: 400,
    errorId: 'OFFICE/MISSING_FIELDS',
    message:
      'Algum ou alguns dos parâmetros obrigatórios não foram enviados corretamente.',
  },
  INVALID_FIELD: {
    status: 400,
    errorId: 'OFFICE/INVALID_FIELD',
    message: 'Dados inválidos foram enviados em algum dos campos.',
  },
};
