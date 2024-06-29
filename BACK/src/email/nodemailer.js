import nodemailer from "nodemailer";
import {
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
  MAIL_USERNAME,
} from "../../configEnv.js";
import { google } from "googleapis";

const oAuthClient = new google.auth.OAuth2(MAIL_CLIENT_ID, MAIL_CLIENT_SECRET);
oAuthClient.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN });

export const sendNotification = async (mailOptions) => {
  const accessToken = await oAuthClient.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      type: "OAUTH2",
      user: MAIL_USERNAME,
      clientId: MAIL_CLIENT_ID,
      clientSecret: MAIL_CLIENT_SECRET,
      refreshToken: MAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
      return "Email sent: " + info.response;
    }
  });
};
