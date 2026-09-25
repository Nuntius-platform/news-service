import { get } from './rss/get.ts'
import { parse } from './rss/parse.ts'
import { save } from './article/save.ts'
import { sources } from '#db/mongo/models/source'
import { logger } from '#config'

export async function poll(): Promise<void> {
  const sourcesResult = await sources.find().toArray()

  if (!sourcesResult.length) {
    return
  }

  for (const source of sourcesResult) {
    try {
      const xml = await get(source.url)

      if (!xml) {
        continue
      }

      const articles = parse(xml, source._id)

      for (const article of articles) {
        await save(article)
      }
    } catch (error: unknown) {
      logger.error({ err: error, sourceId: source._id }, 'Source processing failed')
    }
  }
}
