import { NextFunction, Response } from 'express';
import ReqWithUserID from '../types/ReqWithUserID';
import { isValidObjectId } from 'mongoose';
import DeskErrors from '../constants/errors/DeskErrors';
import { ResponseHelpers } from '../services/misc/Response.service';
import OfficeModel from '../models/Office.model';

const { sendError } = ResponseHelpers;
const { INVALID_FIELD } = DeskErrors;

export default {
  validateUpdate: async (
    req: ReqWithUserID,
    res: Response,
    next: NextFunction
  ) => {
    const { office, deskIds } = req.body;

    //Checar se office é um objectid válido
    if (!isValidObjectId(office)) return sendError(res, INVALID_FIELD);

    //Checa se o escritório existe
    const officeDoc = await OfficeModel.findById(office);
    if (!officeDoc) return sendError(res, INVALID_FIELD);

    //Checa se todos os ids são válidos
    const { deskCount } = officeDoc;
    if (
      !deskIds.every(
        (value: unknown) =>
          value <= deskCount && value > 0 && typeof value == 'number'
      )
    )
      return sendError(res, INVALID_FIELD);

    next();
  },
};
