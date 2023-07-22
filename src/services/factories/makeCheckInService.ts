import { PrismaGymsRepository } from '~src/repositores/prisma/prisma-gyms-repository'
import { CheckInService } from '../CheckInService'
import { PrismaCheckInsRepository } from '~src/repositores/prisma/prisma-check-ins-repository'

export function makeCheckInService() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInService(checkInRepository, gymsRepository)

  return useCase
}
