import { Request, Response } from 'express';
import transporter from '../services/email';
import AuthErrors from '../constants/errors/AuthErrors';
import UserModel from '../models/User.model';
import AuthValidators from '../validators/Auth.validators';
import jwt from 'jsonwebtoken';

export default {
  register: async (req: Request, res: Response) => {
    const { email } = req.body;

    //Validação de campos
    const validationError = AuthValidators.register(email);
    //Caso existam erros, retornar o erro para o usuário
    if (validationError)
      return res.status(validationError.status).json(validationError);

    //Pesquisar usuário no banco de dados
    const user = await UserModel.findOne({ email: email });
    //Se usuário existir, retornar erro
    const emailError = AuthErrors.ACCOUNT_ALREADY_EXISTS;
    if (user) return res.status(emailError.status).json(emailError);

    //Cria usuário no banco de dados
    const newUser = await UserModel.create({
      email: email,
    });

    //Gerar um token que vai identificar o usuário quando ele verificar o e-mail
    const { JWT_KEY } = process.env;
    const validationToken = jwt.sign({ userId: newUser._id }, JWT_KEY);

    //TODO: CRIAR UM TEMPLATE ORGANIZADO PARA O EMAIL.

    const validationUrl =
      'http://localhost:3333/auth/validate/' + validationToken;
    //Email que será enviado para o usuário verificar o email
    var message = {
      from: 'actuallybooored@gmail.com',
      to: 'oui.vinicius@gmail.com',
      subject: 'Verifique sua conta no FCAgenda!',
      html: `<p>Que bom ver você por aqui, consultor!</p><br/><a href='${validationUrl}'>Clique aqui para confirmar sua conta.<a/><br/><p>${validationToken}</p>`,
    };

    return transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          message: 'Seu email de confirmação foi enviado com sucesso.',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
