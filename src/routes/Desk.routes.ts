import { Router } from 'express';
import DeskController from '../controllers/Desk.controller';
import DeskValidators from '../validators/Desk.validators';
import AuthValidators from '../validators/Auth.validators';

const deskRouter = Router();

const { needsAuth, needsAdmin } = AuthValidators;
const { validateUpdate, validateList } = DeskValidators;
const { listDesks, update } = DeskController;

deskRouter.put('/update', needsAdmin, validateUpdate, update);
deskRouter.post('/listdesks', needsAuth, validateList, listDesks);

export default deskRouter;
