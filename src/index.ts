import express from 'express';
import helmet from 'helmet';

//Inicializar o módulo dotenv para ler arquivos .env
import 'dotenv/config';
import authRouter from './routes/Auth.routes';

//Inicializa uma aplicação express
const app = express();

//Middleware responsável pela interpretação de dados JSON
app.use(express.json());
//Middleware de segurança
app.use(helmet());

//Rotas
app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
  console.log('[BACKEND] Servidor iniciado com sucesso!');
});
