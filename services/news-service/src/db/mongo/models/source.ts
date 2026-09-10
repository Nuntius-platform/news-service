import type { ObjectId } from 'mongodb'

export type Source = {
  _id?: ObjectId
  name: string
  url: string
}
