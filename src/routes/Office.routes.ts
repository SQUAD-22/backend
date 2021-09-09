import { Router } from 'express';
import OfficeController from '../controllers/Office.controller';
import OfficeValidators from '../validators/Office.validators';
const officeRouter = Router();

const { create } = OfficeController;
const { validateCreate } = OfficeValidators;

officeRouter.post('/create', validateCreate, create);

export default officeRouter;
