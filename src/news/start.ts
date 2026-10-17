import cron, { type ScheduledTask } from 'node-cron'
import { poll } from './poll.ts'
import { logger } from '#config'

export async function start(): Promise<ScheduledTask> {
  const run = async (): Promise<void> => {
    try {
      await poll()
    } catch (error) {
      logger.error({ err: error }, `Polling failed`)
    }
  }

  await run()

  return cron.schedule(
    '* * * * *',
    () => {
      void run()
    },
    {
      noOverlap: true,
    },
  )
}
