## Personal Project

This a portfolio project constistent of backend (express and mongo) and frontend(svelte).
The application is a crawler. You can provide an url and selector and the program will check it out to find if there are changes in the selector.

## Backend

You must provide a .env file with MONGO_URI,
SECRET,
SALT_ROUNDS,
PORT,
MAIL_USERNAME,
MAIL_PASSWORD,
MAIL_CLIENT_ID,
MAIL_CLIENT_SECRET,
MAIL_REFRESH_TOKEN

To start: npm run start

## Frontend

To start: npm run dev
To build: npm run build

## For testing with cypress e2e

1. Back 'npm run test'
2. Front 'npm run server-test'
3. Front 'npm run cypress"
