import { Response, Request } from 'express';
import AppointmentService from '../services/database/Appointment.service';

export default {
  create: async (req: Request, res: Response) => {
    const { date, office, desk } = req.body;

    const newAppointment = await AppointmentService.create(office, date, desk);

    return res.status(201).json(newAppointment);
  },
};
