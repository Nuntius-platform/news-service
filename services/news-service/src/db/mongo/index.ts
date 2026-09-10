import { MongoClient } from 'mongodb'
import { envConfig } from '@config'

const uri = envConfig.DATABASE_URI

const client = new MongoClient(uri)

export const database = client.db('nuntius_news')
export const articles = database.collection('articles')
