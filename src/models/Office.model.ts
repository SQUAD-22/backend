import { model, Schema } from 'mongoose';

export interface Office {
  name: string;
  state: string;
  city: string;
  occupationLimitPercent: number;
  deskCount: number;
}

const schema = new Schema<Office>({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  occupationLimitPercent: {
    type: Number,
    required: true,
  },
  deskCount: {
    type: Number,
    required: true,
  },
});

const OfficeModel = model<Office>('Office', schema);

export default OfficeModel;
