import { Request, Response } from 'express';
import UserService from '../services/database/User.service';
import JWTService from '../services/misc/JWT.service';
import { hash } from 'bcrypt';
import { EmailService } from '../services/email/Email.service';
import AppointmentService from '../services/database/Appointment.service';

const { signJWT } = JWTService;

export default {
  register: async (req: Request, res: Response) => {
    const { email } = req.body;

    //Cria usuário no banco de dados
    const newUser = await UserService.createUserByEmail(email);

    //Gerar um token que vai identificar o usuário quando ele verificar o e-mail
    const validationToken = await JWTService.signJWT({ userId: newUser._id });

    await EmailService.sendConfirmationEmail(email, validationToken);

    return res.status(200).json({
      emailSent: true,
    });
  },

  verifyEmail: async (req: Request, res: Response) => {
    const { userId } = req;
    const { password, name } = req.body;

    const user = await UserService.findById(userId);

    //Encripta a senha do consultor
    const encryptedPassword = await hash(password, 10);

    //Marca usuário como verificado
    user.verified = true;
    user.password = encryptedPassword;
    user.fullName = name;

    //Salva o usuário
    await user.save();

    const token = await signJWT({ userId: user._id });

    return res.status(200).json({ token });
  },

  login: async (req: Request, res: Response) => {
    const { userId } = req;

    //Criar token de identificação do usuário
    const token = await signJWT({ userId });

    return res.status(200).json({ token });
  },

  userSummary: async (req: Request, res: Response) => {
    const { userId } = req;

    const user = await UserService.findById(userId);
    const appointmentCount = await AppointmentService.countAppointments(userId);

    return res.status(200).json({
      userName: user.fullName,
      appointmentCount,
    });
  },
};
