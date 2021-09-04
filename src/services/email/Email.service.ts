import email from "."

export const EmailService = {
  sendConfirmationEmail: async (to: string, token: string) => {
    return email.send({
      template: "verify-email",
      message: {
        to: to,
      },
      locals: {
        activationURL: "www.google.com"
      }   
    }).then(() => {
      return true;
    }).catch(() => {
      return false;
    })
  }
}
