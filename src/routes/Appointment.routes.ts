import { Router } from 'express';
import AppointmentValidators from '../validators/Appointment.validators';
import AppointmentController from '../controllers/Appointment.controller';
import AuthValidators from '../validators/Auth.validators';

const appointmentRouter = Router();

const { validateCreate } = AppointmentValidators;
const { create, list, cancel } = AppointmentController;
const { needsAuth } = AuthValidators;

appointmentRouter.post('/create', needsAuth, validateCreate, create);
appointmentRouter.get('/list', needsAuth, list);
appointmentRouter.delete('/cancel', needsAuth, cancel);

export default appointmentRouter;
