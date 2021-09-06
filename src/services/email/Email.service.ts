import email from '.';

export const EmailService = {
  sendConfirmationEmail: async (to: string, token: string) => {
    return email
      .send({
        template: 'verify-email',
        message: {
          from: 'actuallybooored@gmail.com',
          to: to,
        },
        locals: {
          activationURL: 'www.google.com',
        },
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  },
};
