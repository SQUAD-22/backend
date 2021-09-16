import OfficeService from '../services/database/Office.service';
import { NextFunction, Response, Request } from 'express';
import { isValidObjectId } from 'mongoose';
import GenericErrors from '../constants/errors/GenericErrors';
import { ResponseHelpers } from '../services/misc/Response.service';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';

const { sendError } = ResponseHelpers;
const { INVALID_FIELD, MISSING_FIELD } = GenericErrors;

export default {
  validateUpdate: async (req: Request, res: Response, next: NextFunction) => {
    const { office, deskIds } = req.body;

    //Checar se office é um objectid válido
    if (!isValidObjectId(office))
      return sendError(res, INVALID_FIELD, 'office');

    //Checa se o escritório existe
    const officeDoc = await OfficeService.findById(office);
    if (!officeDoc) return sendError(res, INVALID_FIELD, 'office');

    //Checa se todos os ids são válidos
    const { deskCount } = officeDoc;
    if (
      !deskIds.every(
        (value: unknown) =>
          value <= deskCount && value > 0 && typeof value == 'number'
      )
    )
      return sendError(res, INVALID_FIELD, 'deskCount');

    next();
  },

  validateList: async (req: Request, res: Response, next: NextFunction) => {
    const { date, office } = req.body;

    const params = ['date', 'office'];
    for (let i = 0; i < params.length; i++) {
      if (!req.body[params[i]]) return sendError(res, MISSING_FIELD, params[i]);
    }

    //Verificar se o escritório é válido
    if (!isValidObjectId(office))
      return sendError(res, INVALID_FIELD, 'office');

    //Checar se a data é válida
    try {
      const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
      if (!isValid(parsedDate)) return sendError(res, INVALID_FIELD, 'date');
    } catch (err) {
      return sendError(res, INVALID_FIELD, 'date');
    }

    next();
  },
};
