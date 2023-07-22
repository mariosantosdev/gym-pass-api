import { GetUserMetricsService } from '../GetUserMetricsService'
import { PrismaCheckInsRepository } from '~src/repositores/prisma/prisma-check-ins-repository'

export function makeGetUserMetrics() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsService(checkInRepository)

  return useCase
}
