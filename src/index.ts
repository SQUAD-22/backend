import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

//Inicializar o módulo dotenv para ler arquivos .env
import 'dotenv/config';
import authRouter from './routes/Auth.routes';
import databaseConnect from './database';
import officeRouter from './routes/Office.routes';
import deskRouter from './routes/Desk.routes';

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

app.listen(process.env.PORT, () => {
  console.log('[BACKEND] Servidor iniciado com sucesso!');
  databaseConnect();
});
