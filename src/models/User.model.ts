import { Schema, model } from 'mongoose';

export interface User {
  fullName: string;
  email: string;
  password: string;
  verified: boolean;
  admin: boolean;
}

//Definindo o Schema
const schema = new Schema<User>({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = model<User>('User', schema);

export default UserModel;
