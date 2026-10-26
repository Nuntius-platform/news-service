import { XMLParser } from 'fast-xml-parser'
import { z } from 'zod'
import type { ObjectId } from 'mongodb'
import { normalize } from '../article/normalize.ts'
import type { Article } from '#db/mongo/models/article'

const feedSchema = z.object({
  rss: z.object({
    channel: z.object({
      item: z.array(
        z.object({
          guid: z.string().optional(),
          link: z.string(),
          description: z.string().optional(),
          'content:encoded': z.string().optional(),
          pubDate: z.string().optional(),
        }),
      ),
    }),
  }),
})

const parser = new XMLParser()

export function parse(xml: string, sourceId: ObjectId): Article[] {
  const parsed = feedSchema.parse(parser.parse(xml))
  const items = parsed.rss.channel.item

  const articles: Article[] = items.map((item) => ({
    sourceId,
    externalId: item.guid ?? item.link,
    url: item.link,
    content: normalize(item['content:encoded'] ?? item.description ?? ''),
    publisheAt: item.pubDate ? new Date(item.pubDate) : undefined,
    createdAt: new Date(),
  }))

  return articles
}
