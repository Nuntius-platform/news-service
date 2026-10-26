import { ObjectId } from 'mongodb'
import { articles as articlesCollection } from '#db/mongo/models/article'

interface Article {
  _id: ObjectId
  content: string
}

interface GetByCursor {
  cursor?: string
  limit: number
  articleIds?: never
}

interface GetByIds {
  articleIds: string[]
  cursor?: never
  limit?: never
}

type GetParams = GetByCursor | GetByIds

export async function getArticles(params: GetParams): Promise<Article[]> {
  if (params.articleIds !== undefined) {
    const articleObjectIds = params.articleIds.map((id) => new ObjectId(id))

    return articlesCollection
      .find({ _id: { $in: articleObjectIds } }, { projection: { _id: 1, content: 1 } })
      .toArray()
  }

  const { cursor, limit } = params
  const filter = cursor ? { _id: { $gt: new ObjectId(cursor) } } : {}

  return articlesCollection
    .find(filter, { projection: { _id: 1, content: 1 } })
    .sort({ _id: 1 })
    .limit(limit)
    .toArray()
}
