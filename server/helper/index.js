
import nodemailer from 'nodemailer';
export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
export function getCurrentTimestamp() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export const sendEmail = async (emailId, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      authMethod: "plain"
    });

    const x = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: emailId,
      subject: subject,
      html: message,
    });
  } catch (error) {
    if (error)
      throw error;
  }
}