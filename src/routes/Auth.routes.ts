import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';
import AuthValidators from '../validators/Auth.validators';
const authRouter = Router();

const { register } = AuthController;
const { validateRegister } = AuthValidators;

authRouter.post('/register', validateRegister, register);
authRouter.post('/validateemail');
authRouter.post('/login');

export default authRouter;
