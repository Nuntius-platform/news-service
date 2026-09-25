import { XMLParser } from 'fast-xml-parser'
import type { ObjectId } from 'mongodb'
import { normalize } from '../article/normalize.ts'
import type { Article } from '#db/mongo/models/article'

interface Item {
  guid?: string
  link: string
  description?: string
  'content:encoded'?: string
  pubDate?: string
}

interface Feed {
  rss: {
    channel: {
      item: Item[]
    }
  }
}

const parser = new XMLParser()

export function parse(xml: string, sourceId: ObjectId): Article[] {
  const parsed = parser.parse(xml) as Feed

  const items = parsed.rss.channel.item

  const articles: Article[] = items.map((item) => ({
    sourceId,
    externalId: item.guid ?? item.link,
    url: item.link,
    content: normalize(item['content:encoded'] ?? item.description ?? ''),
    publishAt: item.pubDate ? new Date(item.pubDate) : undefined,
    createdAt: new Date(),
  }))

  return articles
}
