import ReqWithUserID from "../types/ReqWithUserID";
import {Response, NextFunction} from 'express';
import { isValidObjectId } from "mongoose";
import AppointmentErrors from '../constants/errors/AppointmentErrors'
import { ResponseHelpers } from "../services/misc/Response.service";
import OfficeModel from "../models/Office.model";
import AppointmentModel from "../models/Appointment.model";

const {sendError} = ResponseHelpers;
const {INVALID_FIELD, ALREADY_OCCUPIED} = AppointmentErrors;

export default {
    validateCreate: async (req: ReqWithUserID, res: Response, next: NextFunction) => {
        const {date, desk, office} = req.body;

        //Verificar se os campos são tipos validos.
        if(!isValidObjectId(office)) return sendError(res, INVALID_FIELD);
        if(!Number.isInteger(desk)) return sendError(res, INVALID_FIELD);
        
        //Verificar se o escritorio existe
        const officeInstance = await OfficeModel.findById(office);
        if(!officeInstance) return sendError(res, INVALID_FIELD);

        //Caso o numero da estacao de trabalho seja invalido
        if(desk < 0 || desk > officeInstance.deskCount) return sendError(res, INVALID_FIELD);

        const parsedDate = new Date(date).toISOString().split("T")[0];
        //Checar se ja existe um agendamento nesta data
        const appointmentInstance = await AppointmentModel.findOne({at: parsedDate, desk: desk, office: office});
        if(appointmentInstance) return sendError(res, ALREADY_OCCUPIED);

        next();
    }
}