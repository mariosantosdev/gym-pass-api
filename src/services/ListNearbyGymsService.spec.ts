import { describe, it, beforeEach, expect } from 'vitest'

import { ListNearbyGymsService } from './ListNearbyGymsService'
import { InMemoryGymsRepository } from '~src/repositores/in-memory/in-memory-gyms-repository'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: ListNearbyGymsService

describe('List Nearby Gyms Service', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new ListNearbyGymsService(inMemoryGymsRepository)
  })

  it('should be able to list nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      name: 'Near gym',
      description: null,
      phone: null,
      latitude: -20.7321763,
      longitude: -44.7698854,
    })

    await inMemoryGymsRepository.create({
      name: 'Far Gym',
      description: null,
      phone: null,
      latitude: -20.9255518,
      longitude: -44.2155558,
    })

    const gyms = await sut.execute({
      userLatitude: -20.7321763,
      userLongitude: -44.7698854,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near gym' })])
  })
})
