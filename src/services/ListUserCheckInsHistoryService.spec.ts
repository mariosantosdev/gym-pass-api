import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '~src/repositores/in-memory/in-memory-check-ins-repository'
import { ListUserCheckInsHistoryService } from './ListUserCheckInsHistoryService'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ListUserCheckInsHistoryService

describe('List User Check Ins History Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ListUserCheckInsHistoryService(inMemoryCheckInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch check-in history', async () => {
    await inMemoryCheckInsRepository.create({
      gymId: 'gym-1',
      userId: 'user-1',
    })
    await inMemoryCheckInsRepository.create({
      gymId: 'gym-2',
      userId: 'user-1',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-1',
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-1' }),
      expect.objectContaining({ gymId: 'gym-2' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gymId: `gym-${i}`,
        userId: 'user-1',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
  })
})
