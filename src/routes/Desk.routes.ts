import { Router } from 'express';
import DeskController from '../controllers/Desk.controller';
import DeskValidators from '../validators/Desk.validators';

const deskRouter = Router();

deskRouter.put('/update', DeskValidators.validateUpdate, DeskController.update);

export default deskRouter;
