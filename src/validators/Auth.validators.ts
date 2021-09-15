import UserService from '../services/database/User.service';
import AuthErrors from '../constants/errors/AuthErrors';
import JWTService from '../services/misc/JWT.service';
import { NextFunction, Request, Response } from 'express';
import { ResponseHelpers } from '../services/misc/Response.service';
import { compare } from 'bcrypt';

const {
  MISSING_FIELDS,
  UNAUTHORIZED,
  ACCOUNT_ALREADY_EXISTS,
  INVALID_TOKEN,
  ALREADY_VERIFIED,
  PASSWORD_TOO_SHORT,
  EMAIL_NOT_FOUND,
  WRONG_PASSWORD,
  EMAIL_NOT_VERIFIED,
  TOKEN_NOT_FOUND,
} = AuthErrors;
const { sendError } = ResponseHelpers;
const { decodeJWT } = JWTService;
const emailRegex =
  /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(fcamara)\.com.br$/;

export default {
  validateRegister: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    //Verificar se os campos foram passados corretamente
    if (!email) return sendError(res, MISSING_FIELDS);

    //Valida email
    //if (!emailRegex.test(email)) return sendError(res, INVALID_EMAIL);

    //Verifica se usuário já existe no banco de dados
    const user = await UserService.findByEmail(email);
    if (user) return sendError(res, ACCOUNT_ALREADY_EXISTS);

    next();
  },

  validateVerifyemail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { token, password, name } = req.body;

    //Checa se o token de identificação e senha foram enviados
    if (!token || !password || !name) return sendError(res, MISSING_FIELDS);

    //Checa se o token de identificação é válido
    const decodedToken = await decodeJWT(token);
    if (!decodedToken) return sendError(res, INVALID_TOKEN);
    Request;

    const { userId } = decodedToken;

    //Checa se a senha informada é válida
    if (password.length < 6) return sendError(res, PASSWORD_TOO_SHORT);

    //Checar se o usuário existe
    const user = await UserService.findById(userId);
    if (!user) return sendError(res, INVALID_TOKEN);

    //Caso usuário exista, verificar se ele já está verificado
    if (user.verified) return sendError(res, ALREADY_VERIFIED);

    //Enviar userId para o controller
    req.userId = decodedToken.userId;
    next();
  },

  validateLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //Checa se email e senha foram enviados
    if (!email || !password) return sendError(res, MISSING_FIELDS);

    //Checa se o email é válido
    //if (!emailRegex.test(email)) return sendError(res, INVALID_EMAIL);

    //Checa se senha é válida
    if (password.length < 6) return sendError(res, PASSWORD_TOO_SHORT);

    //Checa se usuário existe
    const user = await UserService.findByEmail(email);
    if (!user) return sendError(res, EMAIL_NOT_FOUND);

    //Checa se o usuário tem o email verificado
    if (!user.verified) return sendError(res, EMAIL_NOT_VERIFIED);

    //Checa se a senha do usuário está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) return sendError(res, WRONG_PASSWORD);

    //Envia o user id para o controller
    req.userId = user._id;
    next();
  },

  needsAuth: async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return sendError(res, TOKEN_NOT_FOUND);

    const token = authHeader.split(' ')[1];
    if (!token) return sendError(res, TOKEN_NOT_FOUND);

    const decodedToken = await decodeJWT(token);
    if (!decodedToken) return sendError(res, INVALID_TOKEN);
    const { userId } = decodedToken;

    const user = await UserService.findById(userId);
    if (!user) return sendError(res, INVALID_TOKEN);

    req.userId = user._id;
    next();
  },

  needsAdmin: async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return sendError(res, TOKEN_NOT_FOUND);

    const token = authHeader.split(' ')[1];
    if (!token) return sendError(res, TOKEN_NOT_FOUND);

    const decodedToken = await decodeJWT(token);
    if (!decodedToken) return sendError(res, INVALID_TOKEN);
    const { userId } = decodedToken;

    const user = await UserService.findById(userId);
    if (!user) return sendError(res, INVALID_TOKEN);
    if (!user.admin) return sendError(res, UNAUTHORIZED);

    req.userId = user._id;
    next();
  },
};
