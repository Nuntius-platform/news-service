import { database } from '@db'
import type { ObjectId } from 'mongodb'

interface Article {
  sourceId: ObjectId
  externalId: string
  url: string
  content: string
  createdAt: Date
}

export const articles = database.collection<Article>('articles')
