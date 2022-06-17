import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: '587',
  auth: { user: 'crawlerJS@hotmail.com', pass: 'crawler2022' },
  secureConnection: false,
  tls: { ciphers: 'SSLv3' }

});


export const sendNotification = (mailOptions) => {
  console.log('MAIL');
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return ('Email sent: ' + info.response);
    }
  });

}
