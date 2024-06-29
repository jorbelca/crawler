// Función que devuelve una plantilla de email
export const createEmail = (email, operation, data) => {
  const mailOptions = {
    from: "crawlerjs6@gmail.com",
    to: email,
    subject: "New Data Found!",
    html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: goldenrod;
                color: #fff;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                padding: 20px;
              }
              .footer {
                background-color: #f0f0f0;
                padding: 10px;
                text-align: center;
                border-radius: 0 0 8px 8px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Data Found!</h1>
              </div>
              <div class="content">
                <p>Hello there,</p>
                <p>We have found new data on the page ${operation.url}.</p>
                <div style="background-color: #f8f9fa; padding: 10px; border-radius: 8px;">
                  <h3>New Data Details:</h3>
                  <p>${data}</p>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent automatically by the Crawler.</p>
              </div>
            </div>
          </body>
        </html>
      `,
  };

  return mailOptions;
};
