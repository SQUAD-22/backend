import { Types } from 'mongoose';
import AppointmentModel from '../../models/Appointment.model';
import format from 'date-fns/format';

export default {
  create: async (office: string, date: string, desk: number) => {
    const newAppointment = await AppointmentModel.create({
      userId: '613b9cc74178515ecdca7be8',
      desk: desk,
      at: date,
      office: office,
      cancelled: false,
    });

    return newAppointment;
  },

  listAll: async (office: string, date: string) => {
    const parsedObjectId = new Types.ObjectId(office);

    const allAppointments = await AppointmentModel.find({
      at: date,
      office: parsedObjectId,
    });

    return allAppointments;
  },

  listByUser: async (userId: string) => {
    const appointments = await AppointmentModel.find({
      userId,
      at: {
        $gte: format(new Date(), 'yyyy-MM-dd'),
      },
    }).populate('office', 'name state city');

    return appointments;
  },

  countAppointments: async (userId: string) => {
    const appointmentCount = await AppointmentModel.countDocuments({
      userId,
      at: {
        $gte: format(new Date(), 'yyyy-MM-dd'),
      },
    });

    return appointmentCount;
  },
};
