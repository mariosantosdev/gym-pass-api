import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { ExpiredCheckInError } from '~src/errors/ExpiredCheckInError'
import { ResourceNotFoundError } from '~src/errors/ResourceNotFoundError'

import { CheckInsRepository } from '~src/repositores/check-ins-repository'

interface ValidateCheckInServiceRequest {
  checkInId: string
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20)
      throw new ExpiredCheckInError()

    checkIn.validatedAt = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
