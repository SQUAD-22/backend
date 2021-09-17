# backend
 
Oi! Este é o repositório principal do backend do projeto FCAgenda, projeto desenvolvido pelo Squad 22 do programa de formação do grupo FCamara.

Aqui vou explicar as escolhas técnicas, como as tecnologias e como decidimos organizar o projeto.

## As tecnologias

Todo o nosso squad tinha mais conhecimento nas tecnologias básicas da web: Javascript, HTML e CSS.

Preferimos, então, utilizar nossas tecnologias de conforto para produzir o backend, utilizando **Node.js** em conjunto com a biblioteca **Express**, que tem uma curva de aprendizado pequena e é fácil de trabalhar com ela.

Quanto ao banco de dados, eu, Marcos, preferi partir para uma opção que eu me sinto mais confortável, **MongoDB**, visto que o Squad não possuía um conhecimento muito profundo em questão de banco de dados. Para manipular o banco de dados, escolhi também a biblioteca **Mongoose**, que facilita bastante o trabalho.

## Estrutura do projeto

A estrutura do projeto que lida propriamente com as rotas foi dívida em três partes, cada uma em suas devidas pastas:
- **/routes**, que declara as rotas e seus middlewares;
- **/validators**, que verifica e retorna possíveis erros para o usuário e
- **/controllers**, que lidam com o resto, alterando o estado do servidor.

Foi padronizado também os erros, que respeitam um objeto pré definido na pasta **/constants/erros**, como, por exemplo:

```javascript
{
    status: 400,
    errorId: "GENERIC/MISSING_FIELD",
    message: "Um parâmetro obrigatório não foi enviado.",
    field: "email"
}
```

Para a manipulação de emails e banco de dados, a pasta **/services** foi criada para criar funções auxiliares de manipulação de banco de dados, envio de emails e afins.

A pasta **/models** simplesmente declara os modelos para o banco de dados e Mongoose.

## Deploy

Para rodar o projeto, basta seguir estes passos:
- Faça um ``git clone`` do projeto;
- Dentro da pasta do projeto, execute ``npm install``
- Renova a extensão ``.example`` do arquivo ``.env.example`` e preencha com os seus dados. Aqui está uma explicação de cada um dos campos:

```
PORT= Porta onde o servidor irá funcionar
SMTP_HOST= Hostname do servidor SMTP (para envio de email)
SMTP_PORT= Porta do servidor SMTP
SMTP_USER= Usuário do servidor SMTP
SMTP_PASS= Senha do servidor SMTP
SMTP_FROM_EMAIL= Campo "from" enviado no email
JWT_KEY= "Chave" privada para criação dos tokens JWT.
MONGO_URI= URI para conexão com o MongoDB.
```

- Rode ``npm run start``

#

Muito obrigado por acompanhar até aqui.

Squad 22.
