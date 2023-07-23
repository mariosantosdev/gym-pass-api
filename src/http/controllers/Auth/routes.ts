import { FastifyInstance } from 'fastify'

import { SignInController } from './SignInController'
import { RefreshTokenController } from './RefreshTokenController'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions', SignInController)
  app.patch('/token/refresh', RefreshTokenController)
}
