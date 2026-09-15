import { MongoClient } from 'mongodb'
import { readFile } from 'node:fs/promises'
import { envConfig } from '#config'

const password = (await readFile(envConfig.MONGO_PASSWORD_FILE, 'utf8')).replace(/\r?\n$/, '')

const client = new MongoClient(
  `mongodb://${encodeURIComponent(envConfig.MONGO_USER)}:${encodeURIComponent(password)}@${envConfig.MONGO_HOST}:${envConfig.MONGO_PORT}/${envConfig.MONGO_DB}?authSource=admin`,
)

export const database = client.db(envConfig.MONGO_DB)
