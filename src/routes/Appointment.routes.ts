import {Router} from 'express'
import AppointmentValidators from '../validators/Appointment.validators';
import AppointmentController from '../controllers/Appointment.controller';

const appointmentRouter = Router();

const {validateCreate} = AppointmentValidators;
const {create} = AppointmentController;

appointmentRouter.post("/create", validateCreate, create);

export default appointmentRouter;
