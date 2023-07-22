import { ListUserCheckInsHistoryService } from '../ListUserCheckInsHistoryService'
import { PrismaCheckInsRepository } from '~src/repositores/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckIns() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new ListUserCheckInsHistoryService(checkInRepository)

  return useCase
}
