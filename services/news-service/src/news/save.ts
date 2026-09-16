import { articles as articlesCollection } from '#db/mongo/models/article'
import type { Article } from '#db/mongo/models/article'

export async function save(article: Article): Promise<void> {
  const articleResult = await articlesCollection.findOne({
    sourceId: article.sourceId,
    externalId: article.externalId,
  })

  if (articleResult) {
    return
  }

  await articlesCollection.insertOne(article)
}
