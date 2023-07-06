import { describe, it, beforeEach, expect } from 'vitest'

import { CreateGymService } from './CreateGymService'
import { InMemoryGymsRepository } from '~src/repositores/in-memory/in-memory-gyms-repository'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(inMemoryGymsRepository)
  })

  it('should be able create gym', async () => {
    const gym = await sut.execute({
      name: 'Academia',
      description: null,
      phone: null,
      latitude: -20.7321763,
      longitude: -44.7698854,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
