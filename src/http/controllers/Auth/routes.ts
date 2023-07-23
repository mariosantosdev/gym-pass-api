import { FastifyInstance } from 'fastify'

import { SignInController } from './SignInController'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions', SignInController)
}
