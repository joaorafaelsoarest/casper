/* import { createTransport, SendMailOptions } from 'nodemailer';

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.TRANSPORTER_EMAIL,
    pass: process.env.TRANSPORTER_PASS,
  },
  tls: { rejectUnauthorized: false },
});

function send(options: SendMailOptions) {
  transporter.sendMail(options, (_error: any, _info: any) => {

  });
}

export { send };
 */
