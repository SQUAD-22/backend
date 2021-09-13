import { NextFunction, Response, Request } from 'express';
import { ResponseHelpers } from '../services/misc/Response.service';
import OfficeErrors from '../constants/errors/OfficeErrors';
import { isValidObjectId } from 'mongoose';
import OfficeModel from '../models/Office.model';

const { sendError } = ResponseHelpers;
const { MISSING_FIELDS, INVALID_FIELD } = OfficeErrors;

export default {
  validateCreate: async (req: Request, res: Response, next: NextFunction) => {
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

  validateUpdate: async (req: Request, res: Response, next: NextFunction) => {
    const { occupationLimitPercent, deskCount, office } = req.body;

    //Verificar se o office é um objectid válido
    if (!isValidObjectId(office)) return sendError(res, INVALID_FIELD);

    //Verifica se o office existe
    const officeDoc = await OfficeModel.findById(office);
    if (!officeDoc) return sendError(res, INVALID_FIELD);

    //Verificar se os campos numéricos são validos, caso sejam enviados.
    if (deskCount) {
      if (!Number.isInteger(deskCount)) return sendError(res, INVALID_FIELD);
      if (deskCount < 0) return sendError(res, INVALID_FIELD);
    }

    if (occupationLimitPercent) {
      if (!Number.isInteger(occupationLimitPercent))
        return sendError(res, INVALID_FIELD);
      if (occupationLimitPercent < 0 || occupationLimitPercent > 100)
        return sendError(res, INVALID_FIELD);
    }

    next();
  },
};
