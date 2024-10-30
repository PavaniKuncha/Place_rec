import nodemailer from "nodemailer";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import * as Mail from "nodemailer/lib/mailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

import authObj from "config/auth.json";

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    authObj.google.client_id,
    authObj.google.client_secret,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: authObj.google.refresh_token,
  });

  const accessToken: string = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transportObj: SMTPTransport.Options = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: authObj.google.email,
      clientId: authObj.google.client_id,
      clientSecret: authObj.google.client_secret,
      refreshToken: authObj.google.refresh_token,
      accessToken,
    },
  };
  const transporter = nodemailer.createTransport(transportObj);

  return transporter;
};

export async function sendEmail(emailOptions: Mail.Options) {
  const emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
}

/*
Example:

sendEmail({
  subject: "Test",
  text: "I am sending an email from nodemailer!",
  to: "aryaishn@gmail.com",
  from: authObj.google.email,
});

*/
