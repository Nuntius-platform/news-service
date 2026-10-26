import { promisify } from 'node:util'
import { ServerCredentials } from '@grpc/grpc-js'
import { server } from './server.ts'
import { envConfig } from '#config'

const bindAsync = promisify(server.bindAsync.bind(server))
const tryShutdown = promisify(server.tryShutdown.bind(server))

export async function startGrpc(): Promise<void> {
  await bindAsync(envConfig.GRPC_ADDRESS, ServerCredentials.createInsecure())
}

export async function stopGrpc(): Promise<void> {
  await tryShutdown()
}
