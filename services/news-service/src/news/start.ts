import cron, { type ScheduledTask } from 'node-cron'
import { polling } from './polling.ts'
import { logger } from '#config'

export function start(): ScheduledTask {
  const run = async (): Promise<void> => {
    try {
      await polling()
    } catch (error) {
      logger.error({ error }, `Polling failed`)
    }
  }

  void run()

  const task = cron.schedule(
    '*/30 * * * *',
    () => {
      void run()
    },
    {
      noOverlap: true,
    },
  )

  return task
}
