import { model, Schema, Types } from 'mongoose';

export interface Desk {
  deskId: number;
  available: boolean;
  office: Types.ObjectId;
}

const schema = new Schema<Desk>({
  deskId: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  office: {
    type: Schema.Types.ObjectId,
    ref: 'Office',
  },
});

const DeskModel = model<Desk>('Desk', schema);

export default DeskModel;
