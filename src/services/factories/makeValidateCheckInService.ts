import { ValidateCheckInService } from '../ValidateCheckInService'
import { PrismaCheckInsRepository } from '~src/repositores/prisma/prisma-check-ins-repository'

export function makeValidateCheckIn() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInService(checkInsRepository)

  return useCase
}
