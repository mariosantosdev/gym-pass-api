import { PrismaGymsRepository } from '~src/repositores/prisma/prisma-gyms-repository'
import { ListNearbyGymsService } from '../ListNearbyGymsService'

export function makeFetchNearbyGyms() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new ListNearbyGymsService(gymsRepository)

  return useCase
}
