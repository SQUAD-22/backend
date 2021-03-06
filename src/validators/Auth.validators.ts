import UserService from '../services/database/User.service';
import AuthErrors from '../constants/errors/AuthErrors';
import JWTService from '../services/misc/JWT.service';
import { NextFunction, Request, Response } from 'express';
import { ResponseHelpers } from '../services/misc/Response.service';
import { compare } from 'bcrypt';
import GenericErrors from '../constants/errors/GenericErrors';

const {
  UNAUTHORIZED,
  ACCOUNT_ALREADY_EXISTS,
  INVALID_TOKEN,
  ALREADY_VERIFIED,
  PASSWORD_TOO_SHORT,
  EMAIL_NOT_FOUND,
  WRONG_PASSWORD,
  EMAIL_NOT_VERIFIED,
} = AuthErrors;
const { MISSING_FIELD, INVALID_FIELD } = GenericErrors;
const { sendError } = ResponseHelpers;
const { decodeJWT } = JWTService;
const emailRegex =
  /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(fcamara)\.com.br$/;

export default {
  validateRegister: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    //Verificar se o email foi passado corretamente
    if (!email) return sendError(res, MISSING_FIELD, 'email');

    //Valida email
    //if (!emailRegex.test(email)) return sendError(res, INVALID_EMAIL);

    //Verifica se usuário já existe no banco de dados
    const user = await UserService.findByEmail(email);
    if (user) return sendError(res, ACCOUNT_ALREADY_EXISTS, 'email');

    next();
  },

  validateVerifyemail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { token, password } = req.body;

    //Checa se o token de identificação e senha foram enviados
    const params = ['token', 'password', 'name'];
    for (let i = 0; i < params.length; i++) {
      if (!req.body[params[i]]) {
        return sendError(res, MISSING_FIELD, params[i]);
      }
    }

    //Checa se o token de identificação é válido
    const decodedToken = await decodeJWT(token);
    if (!decodedToken) return sendError(res, INVALID_FIELD, 'token');

    const { userId } = decodedToken;

    //Checa se a senha informada é válida
    if (password.length < 6)
      return sendError(res, PASSWORD_TOO_SHORT, 'password');

    //Checar se o usuário existe
    const user = await UserService.findById(userId);
    if (!user) return sendError(res, INVALID_FIELD, 'token');

    //Caso usuário exista, verificar se ele já está verificado
    if (user.verified) return sendError(res, ALREADY_VERIFIED, 'token');

    //Enviar userId para o controller
    req.userId = decodedToken.userId;
    next();
  },

  validateLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //Checa se email e senha foram enviados
    const params = ['email', 'password'];
    for (let i = 0; i < params.length; i++) {
      if (!req.body[params[i]]) {
        return sendError(res, MISSING_FIELD, params[i]);
      }
    }

    //Checa se o email é válido
    //if (!emailRegex.test(email)) return sendError(res, INVALID_EMAIL);

    //Checa se senha é válida
    if (password.length < 6)
      return sendError(res, PASSWORD_TOO_SHORT, 'password');

    //Checa se usuário existe
    const user = await UserService.findByEmail(email);
    if (!user) return sendError(res, EMAIL_NOT_FOUND, 'email');

    //Checa se o usuário tem o email verificado
    if (!user.verified) return sendError(res, EMAIL_NOT_VERIFIED, 'email');

    //Checa se a senha do usuário está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) return sendError(res, WRONG_PASSWORD, 'password');

    //Envia o user id para o controller
    req.userId = user._id;
    next();
  },

  needsAuth: async (req: Request, res: Response, next: NextFunction) => {
    //Pega o header de autorização
    const authHeader = req.headers.authorization;
    if (!authHeader) return sendError(res, MISSING_FIELD, 'token');

    //Verifica se o token está no header
    const token = authHeader.split(' ')[1];
    if (!token) return sendError(res, MISSING_FIELD, 'token');

    //Decodifica o token
    const decodedToken = await decodeJWT(token);
    if (!decodedToken) return sendError(res, INVALID_TOKEN, 'token');
    const { userId } = decodedToken;

    //Verifica se o user existe
    const user = await UserService.findById(userId);
    if (!user) return sendError(res, INVALID_TOKEN, 'token');

    req.userId = user._id;
    next();
  },

  needsAdmin: async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return sendError(res, MISSING_FIELD, 'token');

    const token = authHeader.split(' ')[1];
    if (!token) return sendError(res, MISSING_FIELD, 'token');

    const decodedToken = await decodeJWT(token);
    if (!decodedToken) return sendError(res, INVALID_TOKEN, 'token');
    const { userId } = decodedToken;

    const user = await UserService.findById(userId);
    if (!user) return sendError(res, INVALID_TOKEN, 'token');
    if (!user.admin) return sendError(res, UNAUTHORIZED, null);

    req.userId = user._id;
    next();
  },
};
