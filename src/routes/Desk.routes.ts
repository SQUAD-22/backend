import { Router } from 'express';
import DeskController from '../controllers/Desk.controller';
import DeskValidators from '../validators/Desk.validators';
import AuthValidators from '../validators/Auth.validators';

const deskRouter = Router();

const { needsAuth, needsAdmin } = AuthValidators;

deskRouter.put(
  '/update',
  needsAdmin,
  DeskValidators.validateUpdate,
  DeskController.update
);
deskRouter.post('/listdesks', needsAuth, DeskController.listDesks);

export default deskRouter;
