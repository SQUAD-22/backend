import { Response } from "express";
import ReqWithUserID from "../types/ReqWithUserID";
import AppointmentService from "../services/database/Appointment.service";

export default {
  create: async (req: ReqWithUserID, res: Response)  => {
    const {date, office, desk} = req.body;

    const parsedDate = new Date(date).toISOString().split("T")[0];
    const newAppointment = await AppointmentService.create(office, parsedDate, desk);

    return res.status(201).json(newAppointment)
  }
}