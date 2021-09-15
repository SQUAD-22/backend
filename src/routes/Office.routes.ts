import AuthValidators from '../validators/Auth.validators';
import { Router } from 'express';
import OfficeController from '../controllers/Office.controller';
import OfficeValidators from '../validators/Office.validators';
const officeRouter = Router();

const { create, update, list } = OfficeController;
const { validateCreate, validateUpdate } = OfficeValidators;
const { needsAdmin, needsAuth } = AuthValidators;

officeRouter.post('/create', needsAdmin, validateCreate, create);
officeRouter.put('/update', needsAdmin, validateUpdate, update);
officeRouter.get('/list', needsAuth, list);

export default officeRouter;
