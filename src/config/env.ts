import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  MONGO_USER: z.string(),
  MONGO_HOST: z.string(),
  MONGO_PORT: z.string(),
  MONGO_DB: z.string(),
  MONGO_PASSWORD_FILE: z.string(),
})

export const envConfig = envSchema.parse(process.env)
