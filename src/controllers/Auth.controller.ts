import { Request, Response } from 'express';
import UserService from '../services/database/User.service';
import JWTService from '../services/misc/JWT.service';

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
};
