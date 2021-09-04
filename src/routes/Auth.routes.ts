import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';
import AuthValidators from '../validators/Auth.validators';
const authRouter = Router();

const { register, verifyEmail } = AuthController;
const { validateRegister, validateVerifyemail } = AuthValidators;

authRouter.post('/register', validateRegister, register);
authRouter.post('/verifyEmail', validateVerifyemail, verifyEmail);
authRouter.post('/login');

export default authRouter;
