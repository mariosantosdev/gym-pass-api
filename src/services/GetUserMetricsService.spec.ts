import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '~src/repositores/in-memory/in-memory-check-ins-repository'

import { GetUserMetricsService } from './GetUserMetricsService'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(inMemoryCheckInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get check-ins count from metrics', async () => {
    await inMemoryCheckInsRepository.create({
      gymId: 'gym-1',
      userId: 'user-1',
    })
    await inMemoryCheckInsRepository.create({
      gymId: 'gym-2',
      userId: 'user-1',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
