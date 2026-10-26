import { loadSync } from '@grpc/proto-loader'
import { loadPackageDefinition, Server } from '@grpc/grpc-js'
import { handlers } from './handlers.ts'
import type { ProtoGrpcType } from './generated/news.js'

const packageDefinition = loadSync('proto/news.proto', {
  oneofs: true,
})
const proto = loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType

export const server = new Server()
server.addService(proto.news.NewsService.service, handlers)
