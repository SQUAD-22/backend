import { Schema, model } from 'mongoose';

export interface User {
  fullName: string;
  email: string;
  password: string;
}

//Definindo o Schema
const schema = new Schema<User>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model<User>('User', schema);

export default UserModel;