import dotenv from 'dotenv'
dotenv.config()

export default {
  JWT: {
    JWTSecret: process.env.JWT_SECRET as string
  }
}
