export default {
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
    errorId: 'AUTH/ACCOUNT_ALREADY_EXISTS',
    message: 'O e-mail informado já está cadastrado.',
  },
  INVALID_TOKEN: {
    status: 401,
    errorId: 'AUTH/INVALID_TOKEN',
    message: 'O token informado não é válido.',
  },
  ALREADY_VERIFIED: {
    status: 409,
    errorId: 'AUTH/ALREDY_VERIFIED',
    message: 'Este e-mail já está confirmado.',
  },
  UNAUTHORIZED: {
    status: 401,
    errorId: 'AUTH/UNAUTHORIZED',
    message: 'Você não tem permissão para executar esta ação.',
  },
};
