import { model, Schema, Types } from 'mongoose';

export interface Appointment {
  userId: Types.ObjectId;
  office: Types.ObjectId;
  desk: number;
  at: string;
  cancelled: boolean;
}

const schema = new Schema<Appointment>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  office: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Office',
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
