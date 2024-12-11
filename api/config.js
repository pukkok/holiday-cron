import dotenv from 'dotenv'

dotenv.config()

export default {
  MONGODB_URI : process.env.MONGODB_URI,
  BASE_URL : process.env.BASE_URL,
  SECRET_KEY : process.env.SECRET_KEY
}