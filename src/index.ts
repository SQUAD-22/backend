import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

//Inicializar o módulo dotenv para ler arquivos .env
import 'dotenv/config';

//Importar os routers
import authRouter from './routes/Auth.routes';
import databaseConnect from './database';
import officeRouter from './routes/Office.routes';
import deskRouter from './routes/Desk.routes';
import appointmentRouter from './routes/Appointment.routes';

//Inicializa uma aplicação express
const app = express();

//Middleware responsável pela interpretação de dados JSON
app.use(express.json());
//Middleware de segurança
app.use(helmet());
//Cors
app.use(cors());

//Rotas
app.use('/auth', authRouter);
app.use('/office', officeRouter);
app.use('/desk', deskRouter);
app.use('/appointment', appointmentRouter);

//Inicia o servidor na porta especificada
app.listen(process.env.PORT || 3333, () => {
  console.log('[BACKEND] Servidor iniciado com sucesso!');
  //databaseConnect();
});
