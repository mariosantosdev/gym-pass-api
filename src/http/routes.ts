import { FastifyInstance } from 'fastify'

import { RegisterUserController } from './controllers/Users/RegisterUserController'
import { SignInController } from './controllers/Auth/SignInController'

export async function Routes(app: FastifyInstance) {
  app.post('/users', RegisterUserController)
  app.post('/sessions', SignInController)
}
