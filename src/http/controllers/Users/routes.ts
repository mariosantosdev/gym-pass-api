import { FastifyInstance } from 'fastify'

import { RegisterUserController } from './RegisterUserController'
import { ProfileUserController } from './ProfileUserController'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', RegisterUserController)

  app.get('/me', { onRequest: [AuthMiddleware] }, ProfileUserController)
}
