import { NextFunction, Response } from 'express';
import ReqWithUserID from '../types/ReqWithUserID';
import { ResponseHelpers } from '../services/misc/Response.service';
import OfficeErrors from '../constants/errors/OfficeErrors';

const { sendError } = ResponseHelpers;
const { MISSING_FIELDS, INVALID_FIELD } = OfficeErrors;

export default {
  validateCreate: async (
    req: ReqWithUserID,
    res: Response,
    next: NextFunction
  ) => {
    const { name, state, city, occupationLimitPercent, deskCount } = req.body;

    //Se algum dos campos não for enviado
    if (!name || !state || !city || !occupationLimitPercent || !deskCount)
      return sendError(res, MISSING_FIELDS);

    //Checar se algum dos valores numéricos é numérico
    if (
      !Number.isInteger(occupationLimitPercent) ||
      !Number.isInteger(deskCount)
    )
      return sendError(res, INVALID_FIELD);

    //Checar se algum dos valores numéricos é inválido
    if (occupationLimitPercent < 0 || deskCount < 0)
      return sendError(res, INVALID_FIELD);
    if (occupationLimitPercent > 100) return sendError(res, INVALID_FIELD);

    next();
  },
};
