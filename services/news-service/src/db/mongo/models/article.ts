import type { ObjectId } from 'mongodb'

export type Article = {
  _id?: ObjectId
  sourceId: ObjectId
  externalId: string
  url: string
  content: string
  createdAt: Date
}
