import { Request, Response } from 'express';
import ReqWithUserID from '../types/ReqWithUserID';
import UserService from '../services/database/User.service';
import JWTService from '../services/misc/JWT.service';
import { hash } from 'bcrypt';

export default {
  register: async (req: Request, res: Response) => {
    const { email } = req.body;

    //Cria usuário no banco de dados
    const newUser = await UserService.createUserByEmail(email);

    //Gerar um token que vai identificar o usuário quando ele verificar o e-mail
    const validationToken = await JWTService.signJWT({ userId: newUser._id });

    return res.status(200).json({
      token: validationToken,
    });
  },

  verifyEmail: async (req: ReqWithUserID, res: Response) => {
    const { userId } = req;
    const { password } = req.body;

    const user = await UserService.findById(userId);

    //Encripta a senha do consultor
    const encryptedPassword = await hash(password, 10);

    //Marca usuário como verificado
    user.verified = true;
    user.password = encryptedPassword;

    //Salva o usuário
    await user.save();

    return res.json({ error: null });
  },
};
