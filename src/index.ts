import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

//Inicializar o módulo dotenv para ler arquivos .env
import 'dotenv/config';
import authRouter from './routes/Auth.routes';
import databaseConnect from './database';

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

app.listen(process.env.PORT, () => {
  console.log('[BACKEND] Servidor iniciado com sucesso!');
  databaseConnect();
});
