import UserService from '../services/database/User.service';
import AuthErrors from '../constants/errors/AuthErrors';

export default {
  register: async (email: string) => {
    //Verificar se os campos foram passados corretamente
    if (!email) return AuthErrors.MISSING_FIELDS;

    //Valida email
    const emailRegex =
      /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(fcamara)\.com.br$/;
    if (!emailRegex.test(email)) return AuthErrors.INVALID_EMAIL;

    //Verifica se usuário já existe no banco de dados
    const user = await UserService.findByEmail(email);
    if (user) return AuthErrors.ACCOUNT_ALREADY_EXISTS;

    return false;
  },
};
