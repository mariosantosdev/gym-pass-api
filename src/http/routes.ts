import { FastifyInstance } from 'fastify'

import { RegisterUserController } from './controllers/RegisterUserController'

export async function Routes(app: FastifyInstance) {
  app.post('/users', RegisterUserController)
}
