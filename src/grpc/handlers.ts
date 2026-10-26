import { status } from '@grpc/grpc-js'
import { ObjectId } from 'mongodb'
import { getArticles } from './get-articles.ts'
import type { NewsServiceHandlers } from './generated/news/NewsService.ts'
import { logger } from '#config'

export const handlers: NewsServiceHandlers = {
  GetArticles(call, callback) {
    const handle = async (): Promise<void> => {
      const { request } = call

      try {
        let articles

        if (request.articleIdsRequest) {
          const { articleIds } = request.articleIdsRequest

          if (
            !articleIds ||
            articleIds.length === 0 ||
            articleIds.length > 100 ||
            articleIds.some((id) => !ObjectId.isValid(id))
          ) {
            callback({
              code: status.INVALID_ARGUMENT,
              message: 'Invalid article IDs',
            })
            return
          }

          articles = await getArticles({ articleIds })
        } else if (request.cursorRequest) {
          const { cursor, limit } = request.cursorRequest

          if (
            limit === undefined ||
            !Number.isInteger(limit) ||
            limit < 1 ||
            limit > 100 ||
            (cursor !== undefined && !ObjectId.isValid(cursor))
          ) {
            callback({ code: status.INVALID_ARGUMENT, message: 'Invalid cursor or limit' })
            return
          }

          articles = await getArticles({
            limit,
            ...(cursor !== undefined ? { cursor } : {}),
          })
        } else {
          callback({ code: status.INVALID_ARGUMENT, message: 'Request type is required' })
          return
        }

        callback(null, {
          articles: articles.map((article) => ({
            id: article._id.toHexString(),
            content: article.content,
          })),
        })
      } catch (error: unknown) {
        logger.error({ err: error }, 'GetArticles failed')
        callback({ code: status.INTERNAL, message: 'Failed to get articles' })
      }
    }

    void handle()
  },
}
