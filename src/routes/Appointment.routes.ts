import { Router } from 'express';
import AppointmentValidators from '../validators/Appointment.validators';
import AppointmentController from '../controllers/Appointment.controller';
import AuthValidators from '../validators/Auth.validators';

const appointmentRouter = Router();

const { validateCreate } = AppointmentValidators;
const { create, list } = AppointmentController;
const { needsAuth } = AuthValidators;

appointmentRouter.post('/create', validateCreate, create);
appointmentRouter.get('/list', needsAuth, list);

export default appointmentRouter;
