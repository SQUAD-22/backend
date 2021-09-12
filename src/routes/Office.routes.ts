import { Router } from 'express';
import OfficeController from '../controllers/Office.controller';
import OfficeValidators from '../validators/Office.validators';
const officeRouter = Router();

const { create, update, list } = OfficeController;
const { validateCreate, validateUpdate } = OfficeValidators;

officeRouter.post('/create', validateCreate, create);
officeRouter.put('/update', validateUpdate, update);
officeRouter.get('/list', list);

export default officeRouter;
