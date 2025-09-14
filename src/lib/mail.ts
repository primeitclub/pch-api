import nodemailer from 'nodemailer';
import { env } from './env';
import { HttpError } from './httpError';
class Mail {
      static async sendMail(to: string, subject: string, text: string) {
            try {
                  const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                              user: env.EMAIL_USER,
                              pass: env.EMAIL_PASS,
                        },
                  });
                  const mailOptions = {
                        from: env.EMAIL_USER,
                        to,
                        subject,
                        text,
                  };
                  const info = await transporter.sendMail(mailOptions);
                  return info;

            } catch (error) {
                  console.error("Error sending mail", error);
                  throw new HttpError(500, "Internal server error");
            }
      }
}

export default Mail;