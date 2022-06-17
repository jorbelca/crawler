import 'dotenv/config'

export const PORT = process.env.PORT
export const MONGO = process.env.MONGO_URI
export const SECRET = process.env.SECRET
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)