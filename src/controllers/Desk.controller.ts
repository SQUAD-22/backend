import { Response } from 'express';
import AppointmentService from '../services/database/Appointment.service';
import DeskService from '../services/database/Desk.service';
import ReqWithUserID from '../types/ReqWithUserID';

export default {
  update: async (req: ReqWithUserID, res: Response) => {
    const { deskIds, office } = req.body;

    await DeskService.changeAvailable(deskIds, office);

    return res.status(200).json({ error: null });
  },

  listDesks: async (req: ReqWithUserID, res: Response) => {
    const { date, office } = req.body;

    const allDesks = await DeskService.listAll(office);
    const allAppointments = await AppointmentService.listAll(office, date);

    let results: {
      [deskId: number]: {
        available: boolean;
        isOccupied?: boolean;
      };
    } = {};

    allDesks.forEach((desk) => {
      results[desk.deskId] = {
        available: desk.available,
      };
    });

    allAppointments.forEach((appointment) => {
      results[appointment.desk].isOccupied = true;
    });

    return res.status(200).json(results);
  },
};
