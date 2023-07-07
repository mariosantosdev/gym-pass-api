import { describe, it, expect, beforeEach } from 'vitest'

import { ValidateCheckInService } from './ValidateCheckInService'
import { InMemoryCheckInsRepository } from '~src/repositores/in-memory/in-memory-check-ins-repository'
import { ResourceNotFoundError } from '~src/errors/ResourceNotFoundError'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate Check In Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(inMemoryCheckInsRepository)
  })

  it('should be able to validate the check in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(inMemoryCheckInsRepository.items[0].validatedAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(
      sut.execute({
        checkInId: 'inexistent-check-in',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
