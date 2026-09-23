import { start } from './news/start.ts'
import { logger } from '#config'
import { client } from '#db'

const task = start()

let isShuttingDown = false

async function shutdown(): Promise<void> {
  if (isShuttingDown) {
    return
  }

  isShuttingDown = true

  const timeout = setTimeout(() => {
    process.exit(1)
  }, 10_000)

  try {
    await Promise.all([task.stop(), client.close()])

    clearTimeout(timeout)
    process.exit(0)
  } catch (error: unknown) {
    logger.error({ err: error }, 'Shutdown error - forcing exit')
    clearTimeout(timeout)
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  void shutdown()
})

process.on('SIGTERM', () => {
  void shutdown()
})
