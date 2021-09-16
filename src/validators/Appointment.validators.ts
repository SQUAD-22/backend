import { Response, NextFunction, Request } from 'express';
import { isValidObjectId } from 'mongoose';
import AppointmentErrors from '../constants/errors/AppointmentErrors';
import { ResponseHelpers } from '../services/misc/Response.service';
import { parse, isValid } from 'date-fns';
import GenericErrors from '../constants/errors/GenericErrors';
import OfficeService from '../services/database/Office.service';
import AppointmentService from '../services/database/Appointment.service';
import DeskService from '../services/database/Desk.service';
import AuthErrors from '../constants/errors/AuthErrors';

const { sendError } = ResponseHelpers;
const { ALREADY_OCCUPIED, APPOINTMENT_ALREADY_EXISTS, DESK_IS_UNAVAILABLE } =
  AppointmentErrors;
const { UNAUTHORIZED } = AuthErrors;
const { INVALID_FIELD, MISSING_FIELD } = GenericErrors;

export default {
  validateCreate: async (req: Request, res: Response, next: NextFunction) => {
    const { date, desk, office } = req.body;

    const params = ['date', 'desk', 'office'];
    for (let i = 0; i < params.length; i++) {
      if (!req.body[params[i]]) {
        return sendError(res, MISSING_FIELD, params[i]);
      }
    }

    //Verificar se os campos são tipos validos.
    if (!isValidObjectId(office))
      return sendError(res, INVALID_FIELD, 'office');
    if (!Number.isInteger(desk)) return sendError(res, INVALID_FIELD, 'desk');

    //Verificar se o escritorio existe
    const officeInstance = await OfficeService.findById(office);
    if (!officeInstance) return sendError(res, INVALID_FIELD, 'office');

    //Caso o numero da estacao de trabalho seja invalido
    if (desk < 0 || desk > officeInstance.deskCount)
      return sendError(res, INVALID_FIELD, 'desk');

    //Verificar se a estação é válida
    const deskInstance = await DeskService.findOne({
      office: office,
      deskId: desk,
    });
    if (!deskInstance.available)
      return sendError(res, DESK_IS_UNAVAILABLE, 'desk');

    //Checar se a data é válida
    try {
      const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
      if (!isValid(parsedDate)) return sendError(res, INVALID_FIELD, 'date');
    } catch (err) {
      return sendError(res, INVALID_FIELD, 'date');
    }

    //Checar se usuário já fez agendamento nesta data
    const alreadyExistsAppointment = await AppointmentService.findOne({
      at: date,
      userId: req.userId,
    });
    if (alreadyExistsAppointment)
      return sendError(res, APPOINTMENT_ALREADY_EXISTS, 'date');

    //Checar se ja existe um agendamento nesta data
    const appointmentInstance = await AppointmentService.findOne({
      at: date,
      desk: desk,
      office: office,
    });
    if (appointmentInstance) return sendError(res, ALREADY_OCCUPIED, 'desk');

    next();
  },

  validateCancel: async (req: Request, res: Response, next: NextFunction) => {
    const { appointment } = req.body;
    const { userId } = req;

    const params = ['appointment'];
    for (let i = 0; i < params.length; i++) {
      if (!req.body[params[i]]) return sendError(res, MISSING_FIELD, params[i]);
    }

    if (!isValidObjectId(appointment))
      return sendError(res, INVALID_FIELD, 'appointment');

    const appointmentDoc = await AppointmentService.getById(appointment);
    if (!appointmentDoc) return sendError(res, INVALID_FIELD, 'appointment');

    if (appointmentDoc.userId !== userId)
      return sendError(res, UNAUTHORIZED, null);

    next();
  },

  validateDetail: async (req: Request, res: Response, next: NextFunction) => {
    const { appointment } = req.body;
    const { userId } = req;

    const params = ['appointment'];
    for (let i = 0; i < params.length; i++) {
      if (!req.body[params[i]]) return sendError(res, MISSING_FIELD, params[i]);
    }

    if (!isValidObjectId(appointment))
      return sendError(res, INVALID_FIELD, 'appointment');

    const appointmentDoc = await AppointmentService.getById(appointment);
    if (!appointmentDoc) return sendError(res, INVALID_FIELD, 'appointment');

    next();
  },
};
