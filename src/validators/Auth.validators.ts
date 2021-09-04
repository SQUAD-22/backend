import UserService from '../services/database/User.service';
import AuthErrors from '../constants/errors/AuthErrors';
import JWTService from '../services/misc/JWT.service';
import { NextFunction, Request, Response } from 'express';
import { ResponseHelpers } from '../services/misc/Response.service';
import ReqWithUserID from '../types/ReqWithUserID';

const {
  MISSING_FIELDS,
  INVALID_EMAIL,
  ACCOUNT_ALREADY_EXISTS,
  INVALID_TOKEN,
  ALREADY_VERIFIED,
} = AuthErrors;
const { sendError } = ResponseHelpers;
const { decodeJWT } = JWTService;

export default {
  validateRegister: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    //Verificar se os campos foram passados corretamente
    if (!email) return sendError(res, MISSING_FIELDS);

    //Valida email
    const emailRegex =
      /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(fcamara)\.com.br$/;
    if (!emailRegex.test(email)) return sendError(res, INVALID_EMAIL);

    //Verifica se usuário já existe no banco de dados
    const user = await UserService.findByEmail(email);
    if (user) return sendError(res, ACCOUNT_ALREADY_EXISTS);

    next();
  },

  validateVerifyemail: async (
    req: ReqWithUserID,
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.body;

    //Checa se o token de identificação foi enviado
    if (!token) return sendError(res, MISSING_FIELDS);

    //Checa se o token de identificação é válido
    const decodedToken = await decodeJWT(token);
    if (!decodedToken) return sendError(res, INVALID_TOKEN);

    const { userId } = decodedToken;

    //Checar se o usuário existe
    const user = await UserService.findById(userId);
    if (!user) return sendError(res, INVALID_TOKEN);

    //Caso usuário exista, verificar se ele já está verificado
    if (user.verified) return sendError(res, ALREADY_VERIFIED);

    //Enviar userId para o controller
    req.userId = decodedToken.userId;
    next();
  },
};
