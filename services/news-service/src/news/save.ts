import { articles as articlesCollection } from '#db/mongo/models/article'
import type { Article } from '#db/mongo/models/article'

export async function save(article: Article): Promise<void> {
  await articlesCollection.insertOne(article)
}
