import type { ObjectId } from 'mongodb'
import { database } from '#db'

export interface Article {
  sourceId: ObjectId
  externalId: string
  url: string
  content: string
  createdAt: Date
}

export const articles = database.collection<Article>('articles')
