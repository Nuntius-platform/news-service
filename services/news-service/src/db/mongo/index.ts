import { MongoClient } from 'mongodb'
import { envConfig } from '@config'

const client = new MongoClient(envConfig.DATABASE_URI)

export const database = client.db('nuntius_news')
