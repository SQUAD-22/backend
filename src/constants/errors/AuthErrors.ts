export default {
  INVALID_EMAIL: {
    status: 400,
    errorId: 'AUTH/INVALID_EMAIL',
    message: 'O e-mail fornecido é inválido.',
  },
  MISSING_FIELDS: {
    status: 400,
    errorId: 'AUTH/MISSING_FIELDS',
    message:
      'Algum ou alguns dos parâmetros obrigatórios não foram enviados corretamente.',
  },
  PASSWORD_TOO_SHORT: {
    status: 400,
    errorId: 'AUTH/PASSWORD_TOO_SHORT',
    message: 'A senha deve conter no mínimo 6 caracteres.',
  },
  EMAIL_NOT_FOUND: {
    status: 404,
    errorId: 'AUTH/EMAIL_NOT_FOUND',
    message: 'O e-mail informado não está cadastrado.',
  },
  WRONG_PASSWORD: {
    status: 409,
    errorId: 'AUTH/WRONG_PASSWORD',
    message: 'A senha informada não coincide com o cadastro.',
  },
  EMAIL_NOT_VERIFIED: {
    status: 401,
    errorId: 'AUTH/EMAIL_NOT_VERIFIED',
    message: 'O e-mail deste usuário ainda não foi verificado.',
  },
  ACCOUNT_ALREADY_EXISTS: {
    status: 409,
    errorId: 'AUTH/EMAIL_ALREADY_EXISTS',
    message: 'O e-mail informado já está cadastrado.',
  },
};
