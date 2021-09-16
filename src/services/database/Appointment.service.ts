import { Document, Types } from 'mongoose';
import AppointmentModel from '../../models/Appointment.model';
import format from 'date-fns/format';

export default {
  create: async (
    office: string,
    date: string,
    desk: number,
    userId: string
  ) => {
    const newAppointment = await AppointmentModel.create({
      userId,
      desk,
      at: date,
      office,
      cancelled: false,
    });

    return newAppointment;
  },

  findOne: async (query: any) => {
    const foundDocs = await AppointmentModel.findOne(query);
    return foundDocs;
  },

  getById: async (appointment: string) => {
    const appointmentDoc = await (
      await AppointmentModel.findById(appointment)
    ).populate('office');
    return appointmentDoc;
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
      userId: userId,
      at: {
        $gte: format(new Date(), 'yyyy-MM-dd'),
      },
    }).populate('office', 'name state city');

    return appointments;
  },

  countAppointments: async (userId: string) => {
    const parsedObjectId = new Types.ObjectId(userId);

    const appointmentCount = await AppointmentModel.countDocuments({
      userId: parsedObjectId,
      at: {
        $gte: format(new Date(), 'yyyy-MM-dd'),
      },
    });

    return appointmentCount;
  },

  cancel: async (appointment: string) => {
    await AppointmentModel.findByIdAndDelete(appointment);
    return true;
  },
};
