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
          activationURL: `https://squad-22.github.io/frontend/auth/verifyemail?email=${to}&token=${token}`,
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
