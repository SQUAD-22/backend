import { Router } from 'express';
import AppointmentValidators from '../validators/Appointment.validators';
import AppointmentController from '../controllers/Appointment.controller';
import AuthValidators from '../validators/Auth.validators';

const appointmentRouter = Router();

const { validateCreate, validateCancel } = AppointmentValidators;
const { create, list, cancel, detail } = AppointmentController;
const { needsAuth } = AuthValidators;

appointmentRouter.post('/create', needsAuth, validateCreate, create);
appointmentRouter.get('/list', needsAuth, list);
appointmentRouter.delete('/cancel', needsAuth, validateCancel, cancel);
appointmentRouter.post('/detail', needsAuth, detail);

export default appointmentRouter;
