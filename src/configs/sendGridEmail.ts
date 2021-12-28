import sgMail from '@sendgrid/mail';

interface IEmail {
  to: string;
  code: string;
}
export const sendGridEmail = {
  async send({ code, to }: IEmail) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const email = {
      from: 'lucas_g_aguiar@hotmail.com',
      to: to,
      subject: 'Recuperação de senha',
      text: code,
      html: `<strong>Seu código de recuperação é esse: ${code}</strong>`,
    };
    console.log('aqui', email);
    try {
      await sgMail.send(email);
      console.log('Email sent');
    } catch (error) {
      console.log(error.response.body);
    }
  },
};
