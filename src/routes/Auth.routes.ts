import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';
import AuthValidators from '../validators/Auth.validators';
const authRouter = Router();

const { register, verifyEmail, login } = AuthController;
const { validateRegister, validateVerifyemail, needsAuth, validateLogin } =
  AuthValidators;

authRouter.post('/register', validateRegister, register);
authRouter.post('/verifyEmail', validateVerifyemail, verifyEmail);
authRouter.post('/login', validateLogin, login);

export default authRouter;
