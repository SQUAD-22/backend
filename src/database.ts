import { connect } from 'mongoose';

const { MONGO_URI } = process.env;

//Conecta ao banco de dados.
const databaseConnect = () =>
  connect(MONGO_URI)
    .then(() => {
      console.log('[BANCO] Conectado ao banco de dados com sucesso!');
    })
    .catch((err) => {
      console.log('Não foi possível conectar ao banco de dados. Saindo...');
      console.log(err);
      process.kill(process.pid, 'SIGTERM');
    });

export default databaseConnect;
