import { Response, Request } from 'express';
import AppointmentService from '../services/database/Appointment.service';

export default {
  create: async (req: Request, res: Response) => {
    const { date, office, desk } = req.body;

    const newAppointment = await AppointmentService.create(
      office,
      date,
      desk,
      req.userId
    );

    return res.status(201).json(newAppointment);
  },

  list: async (req: Request, res: Response) => {
    const { userId } = req;

    const appointments = await AppointmentService.listByUser(userId);

    return res.status(200).json(appointments);
  },

  cancel: async (req: Request, res: Response) => {
    const { appointment } = req.body;

    await AppointmentService.cancel(appointment);

    return res.status(200).json({ errorId: null });
  },

  detail: async (req: Request, res: Response) => {
    const { appointment } = req.body;

    const appointmentDoc = await AppointmentService.getById(appointment);

    return res.status(200).json(appointmentDoc);
  },
};
