import AuthErrors from '../constants/errors/AuthErrors';

export default {
  register: (email: string) => {
    //Verificar se os campos foram passados corretamente
    if (!email) return AuthErrors.MISSING_FIELDS;

    //Validar email
    const emailRegex =
      /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(fcamara)\.com.br$/;
    if (!emailRegex.test(email)) return AuthErrors.INVALID_EMAIL;

    return false;
  },
};
