import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { ValidateCheckInService } from './ValidateCheckInService'
import { InMemoryCheckInsRepository } from '~src/repositores/in-memory/in-memory-check-ins-repository'
import { ResourceNotFoundError } from '~src/errors/ResourceNotFoundError'
import { ExpiredCheckInError } from '~src/errors/ExpiredCheckInError'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate Check In Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(inMemoryCheckInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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

  it('should not be able to validate an check in after expired time', async () => {
    vi.setSystemTime(new Date('2023-01-01 13:40:00'))

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.advanceTimersByTime(60 * 21 * 1000) // 21 minutes

    await expect(
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(ExpiredCheckInError)
  })
})
