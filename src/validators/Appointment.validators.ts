import { Response, NextFunction, Request } from 'express';
import { isValidObjectId } from 'mongoose';
import AppointmentErrors from '../constants/errors/AppointmentErrors';
import { ResponseHelpers } from '../services/misc/Response.service';
import OfficeModel from '../models/Office.model';
import AppointmentModel from '../models/Appointment.model';
import { parse, isValid, isPast } from 'date-fns';
import DeskModel from '../models/Desk.model';

const { sendError } = ResponseHelpers;
const { INVALID_FIELD, ALREADY_OCCUPIED } = AppointmentErrors;

export default {
  validateCreate: async (req: Request, res: Response, next: NextFunction) => {
    const { date, desk, office } = req.body;

    //Verificar se os campos são tipos validos.
    if (!isValidObjectId(office)) return sendError(res, INVALID_FIELD);
    if (!Number.isInteger(desk)) return sendError(res, INVALID_FIELD);

    //Verificar se o escritorio existe
    const officeInstance = await OfficeModel.findById(office);
    if (!officeInstance) return sendError(res, INVALID_FIELD);

    //Caso o numero da estacao de trabalho seja invalido
    if (desk < 0 || desk > officeInstance.deskCount)
      return sendError(res, INVALID_FIELD);

    //Verificar se a estação é válida
    const deskInstance = await DeskModel.findOne({
      office: office,
      deskId: desk,
    });
    if (!deskInstance.available) return sendError(res, INVALID_FIELD);

    //Checar se a data é válida
    try {
      const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
      if (!isValid(parsedDate)) return sendError(res, INVALID_FIELD);
      if (isPast(parsedDate)) return sendError(res, INVALID_FIELD);
    } catch (err) {
      return sendError(res, INVALID_FIELD);
    }

    //Checar se ja existe um agendamento nesta data
    const appointmentInstance = await AppointmentModel.findOne({
      at: date,
      desk: desk,
      office: office,
    });
    if (appointmentInstance) return sendError(res, ALREADY_OCCUPIED);

    next();
  },
};
