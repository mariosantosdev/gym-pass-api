import { FastifyInstance } from 'fastify'

import { RegisterUserController } from './controllers/Users/RegisterUserController'

export async function Routes(app: FastifyInstance) {
  app.post('/users', RegisterUserController)
}
