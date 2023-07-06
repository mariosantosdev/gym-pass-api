import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { CheckInService } from './CheckInService'
import { InMemoryCheckInsRepository } from '~src/repositores/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '~src/repositores/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from '~src/errors/MaxNumberOfCheckInsError'
import { MaxDistanceError } from '~src/errors/MaxDistanceError'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check In Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(inMemoryCheckInsRepository, inMemoryGymsRepository)

    await inMemoryGymsRepository.create({
      id: 'gym-id',
      name: 'Gym Name',
      latitude: 0,
      longitude: 0,
      phone: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 24, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check inon distant gym', async () => {
    await inMemoryGymsRepository.create({
      id: 'gym-2',
      name: 'Gym Name',
      latitude: 0,
      longitude: 0,
      phone: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-2',
        userId: 'user-id',
        userLatitude: -20.7321763,
        userLongitude: -44.7698854,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
