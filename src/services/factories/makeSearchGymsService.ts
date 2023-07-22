import { PrismaGymsRepository } from '~src/repositores/prisma/prisma-gyms-repository'
import { SearchGymsService } from '../SearchGymsService'

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsService(gymsRepository)

  return useCase
}
