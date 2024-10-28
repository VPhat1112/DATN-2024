import nodemailer from "nodemailer";
import { email } from "../helpers/joi_schema";

export const sendMail = async ({ email, html, subject }) => {
  try {
    // Validate environment variables (consider using a linter or a dedicated validation library)
    if (!process.env.EMAIL_NAME || !process.env.EMAIL_APP_PASSWORD) {
      throw new Error('Missing required environment variables: EMAIL_NAME and EMAIL_APP_PASSWORD');
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Consider using secure: true for enhanced security (TLS)
      auth: {
        user: 'vanphattk147@gmail.com',
        pass: 'egng klmw wlwq bjsd',
      },
    });

    console.log(`Sending email to: ${email}`); // Log with informative message

    const info = await transporter.sendMail({
      from: '"CYCLONE JOKER " <no-reply@CJ.com>', // Sender address
      to: email, // List of receivers
      subject: subject, // Subject line
      html: html, // HTML body
    });

    console.log("Email sent:", info.messageId); // Log success message with message ID
    return info;
  } catch (error) {
    console.error("Error sending email:", error); // Log error details for debugging
    reject(error);
  }
};
