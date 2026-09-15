import cron from 'node-cron'
import { polling } from './polling.ts'
import { logger } from '#config'

export function start(): void {
  const run = async (): Promise<void> => {
    try {
      await polling()
    } catch (error) {
      logger.error({ error }, `Polling failed`)
    }
  }

  void run()

  cron.schedule(
    '*/30 * * * *',
    () => {
      void run()
    },
    {
      noOverlap: true,
    },
  )
}
