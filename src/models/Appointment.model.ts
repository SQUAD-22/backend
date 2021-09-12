import { model, Schema } from 'mongoose';

export interface Appointment {
  userId: Schema.Types.ObjectId;
  office: Schema.Types.ObjectId;
  desk: number;
  at: string;
  cancelled: boolean;
}

const schema = new Schema<Appointment>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  office: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  desk: {
    type: Number,
    required: true,
  },
  at: {
    type: String,
    required: true,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
});

const AppointmentModel = model<Appointment>('Appointment', schema);

export default AppointmentModel;
