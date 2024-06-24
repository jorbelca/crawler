import "dotenv/config";

export const MONGO = process.env.MONGO_URI;
export const MONGO_TEST = process.env.MONGO_URI_TEST;
export const SECRET = process.env.SECRET;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_CLIENT_ID = process.env.MAIL_CLIENT_ID;
export const MAIL_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
export const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
export const NODE_ENV = process.env.NODE_ENV;
let Port;
if (NODE_ENV == "test") {
  Port = 1234;
} else {
  Port = process.env.PORT || 3030;
}
export const PORT = Port;
