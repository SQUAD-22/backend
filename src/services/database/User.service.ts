import UserModel from '../../models/User.model';

export default {
  findByEmail: async (email: string) => {
    const user = await UserModel.findOne({ email: email });
    return user;
  },

  createUserByEmail: async (email: string) => {
    const user = await UserModel.create({ email });
    return user;
  },

  findById: async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
  },
};
