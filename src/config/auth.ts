import dotenv from 'dotenv'
dotenv.config()

export default {
  JWT: {
    Secret: process.env.JWT_SECRET as string
  },

  AES: {
    Secret: process.env.AES_SECRET as string
  }
}
