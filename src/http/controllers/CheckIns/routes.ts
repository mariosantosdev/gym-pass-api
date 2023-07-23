import { FastifyInstance } from 'fastify'

import { AuthMiddleware } from '~src/http/middlewares/AuthMiddleware'
import { CreateCheckInController } from './CreateCheckInController'
import { ValidateCheckInController } from './ValidateCheckInController'
import { GetCheckInHistoryController } from './GetCheckInHistoryController'
import { GetCheckInMetricsController } from './GetCheckInMetricsController'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', AuthMiddleware)

  app.get('/check-ins/history', GetCheckInHistoryController)
  app.get('/check-ins/metrics', GetCheckInMetricsController)

  app.post('/gyms/:gymId/check-in', CreateCheckInController)
  app.patch('/check-ins/:checkInId/validate', ValidateCheckInController)
}
