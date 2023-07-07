import { describe, it, beforeEach, expect } from 'vitest'

import { SearchGymsService } from './SearchGymsService'
import { InMemoryGymsRepository } from '~src/repositores/in-memory/in-memory-gyms-repository'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(inMemoryGymsRepository)
  })

  it('should be able to search gyms by name', async () => {
    await inMemoryGymsRepository.create({
      name: 'Academia',
      description: null,
      phone: null,
      latitude: -20.7321763,
      longitude: -44.7698854,
    })

    await inMemoryGymsRepository.create({
      name: 'Academia Superação',
      description: null,
      phone: null,
      latitude: -20.7321763,
      longitude: -44.7698854,
    })

    const gyms = await sut.execute({
      query: 'Superação',
    })

    expect(gyms).toHaveLength(1)
  })

  it('should be able to search paginated gyms by name ', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        name: `Academia ${i}`,
        description: null,
        phone: null,
        latitude: -20.7321763,
        longitude: -44.7698854,
      })
    }

    const gyms = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Academia 21' }),
      expect.objectContaining({ name: 'Academia 22' }),
    ])
  })
})
