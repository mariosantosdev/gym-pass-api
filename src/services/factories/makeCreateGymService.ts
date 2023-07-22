import { PrismaGymsRepository } from '~src/repositores/prisma/prisma-gyms-repository'
import { CreateGymService } from '../CreateGymService'

export function makeCreateGym() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymService(gymsRepository)

  return useCase
}
