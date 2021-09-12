import AppointmentModel from "../../models/Appointment.model"

export default {
  create: async (office: string, date: string, desk: number) => {
    const newAppointment = await AppointmentModel.create({
      userId: "613b9cc74178515ecdca7be8",
      desk: desk,
      at: date,
      office: office,
      cancelled: false
    })

    return newAppointment;
  }
}