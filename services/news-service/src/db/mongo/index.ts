import { MongoClient } from 'mongodb'
import { readFile } from 'node:fs/promises'
import { envConfig } from '#config'

const password = (await readFile(envConfig.MONGO_PASSWORD_FILE, 'utf8')).replace(/\r?\n$/, '')

export const client = new MongoClient(
  `mongodb://${envConfig.MONGO_HOST}:${envConfig.MONGO_PORT}/${envConfig.MONGO_DB}?authSource=admin`,
  {
    auth: {
      username: envConfig.MONGO_USER,
      password,
    },
  },
)

export const database = client.db(envConfig.MONGO_DB)
