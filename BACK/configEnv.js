import 'dotenv/config'

export const PORT = process.env.PORT || 3030
export const MONGO = process.env.MONGO_URI
export const SECRET = process.env.SECRET
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
export const MAIL_USERNAME = process.env.MAIL_USERNAME
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD
export const MAIL_CLIENT_ID = process.env.MAIL_CLIENT_ID
export const MAIL_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET
export const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN