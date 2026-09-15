import { XMLParser } from 'fast-xml-parser'
import type { ObjectId } from 'mongodb'
import type { Article } from '#db/mongo/models/article'

interface RssItem {
  guid?: string
  link: string
  description?: string
  'content:encoded'?: string
}

interface RssFeed {
  rss: {
    channel: {
      item: RssItem[]
    }
  }
}

const parser = new XMLParser()

export function parseRss(xml: string, sourceId: ObjectId): Article[] {
  const parsed = parser.parse(xml) as RssFeed

  const items = parsed.rss.channel.item

  const articles: Article[] = items.map((item) => ({
    sourceId,
    externalId: item.guid ?? item.link,
    url: item.link,
    content: item['content:encoded'] ?? item.description ?? '',
    createdAt: new Date(),
  }))

  return articles
}
