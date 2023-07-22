import { FastifyInstance } from 'fastify'

import { RegisterUserController } from './controllers/Users/RegisterUserController'
import { SignInController } from './controllers/Auth/SignInController'
import { ProfileUserController } from './controllers/Users/ProfileUserController'
import { AuthMiddleware } from './middlewares/AuthMiddleware'

export async function Routes(app: FastifyInstance) {
  app.post('/users', RegisterUserController)
  app.post('/sessions', SignInController)

  app.get('/me', { onRequest: [AuthMiddleware] }, ProfileUserController)
}
