import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '~src/repositores/check-ins-repository'

interface ListUserCheckInsHistoryServiceRequest {
  userId: string
  page?: number
}

interface ListUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class ListUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: ListUserCheckInsHistoryServiceRequest): Promise<ListUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
