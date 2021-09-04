import { createTransport } from 'nodemailer';
import Email from "email-templates"

//Desestruturando as informações do .env
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

//Criar um transporter para envio de emails
let transporter = createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

//Criar uma instancia do email-templates para gerenciar templates
const email = new Email({
  transport: transporter,
  send: true,
  preview: false,
  views: {
    options: {
      extension:"pug"
    },
    root: "./templates/"
  }
})

export default email;
