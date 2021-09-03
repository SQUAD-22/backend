import { createTransport } from 'nodemailer';

//Desestruturando as informações do .env
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

let transporter = createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export default transporter;
