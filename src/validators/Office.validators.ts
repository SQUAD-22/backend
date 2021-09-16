import { NextFunction, Response, Request } from 'express';
import { ResponseHelpers } from '../services/misc/Response.service';
import { isValidObjectId } from 'mongoose';
import GenericErrors from '../constants/errors/GenericErrors';
import OfficeService from '../services/database/Office.service';

const { sendError } = ResponseHelpers;
const { MISSING_FIELD, INVALID_FIELD } = GenericErrors;

//Funções auxiliares
const isInt = (n: number) => Number.isInteger(n) && n > 0;
const isValidPercent = (n: number) => n > 0 && n <= 100;

export default {
  validateCreate: async (req: Request, res: Response, next: NextFunction) => {
    const { occupationLimitPercent, deskCount } = req.body;

    //Se algum dos campos não for enviado
    const params = [
      'name',
      'state',
      'city',
      'occupationLimitPercent',
      'deskCount',
    ];
    for (let i = 0; i < params.length; i++) {
      if (!req.body[params[i]]) {
        return sendError(res, MISSING_FIELD, params[i]);
      }
    }

    //Verificar se é inteiro e está no intervalo permitido
    if (
      !isInt(occupationLimitPercent) ||
      !isValidPercent(occupationLimitPercent)
    )
      return sendError(res, INVALID_FIELD, 'occupationLimitPercent');

    //Verificar se é um inteiro positivo.
    if (!isInt(deskCount)) return sendError(res, INVALID_FIELD, 'deskCount');

    next();
  },

  validateUpdate: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { occupationLimitPercent, deskCount, office } = req.body;

    //Verificar se o office é um objectid válido
    if (!isValidObjectId(office))
      return sendError(res, INVALID_FIELD, 'office');

    //Verificar se occupationLimitPercent é inteiro, positivo e porcentagem válida.
    if (occupationLimitPercent) {
      if (
        !isInt(occupationLimitPercent) ||
        !isValidPercent(occupationLimitPercent)
      )
        return sendError(res, INVALID_FIELD, 'occupationLimitPercent');
    }

    //Verificar se deskCount é um inteiro positivo
    if (deskCount && !isInt(deskCount))
      return sendError(res, INVALID_FIELD, 'deskCount');

    //Verifica se o office existe
    const officeDoc = await OfficeService.findById(office);
    if (!officeDoc) return sendError(res, INVALID_FIELD, 'office');

    next();
  },
};
