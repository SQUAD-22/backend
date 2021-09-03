import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';
const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/validateemail');
authRouter.post('/login');

export default authRouter;
