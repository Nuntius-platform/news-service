import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URI: z.string(),
})

export const envConfig = envSchema.parse(process.env)
