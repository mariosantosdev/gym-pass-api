import { FastifyInstance } from 'fastify'

import { AuthMiddleware } from '../../middlewares/AuthMiddleware'
import { SearchGymController } from './SearchGymsController'
import { NearbyGymController } from './NearbyGymsController'
import { CreateGymController } from './CreateGymController'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', AuthMiddleware)

  app.get('/gyms/search', SearchGymController)
  app.get('/gyms/nearby', NearbyGymController)

  app.post('/gyms', CreateGymController)
}
