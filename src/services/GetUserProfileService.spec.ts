import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '~src/repositores/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './GetUserProfileService'
import { ResourceNotFoundError } from '~src/errors/ResourceNotFoundError'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const { id: userId } = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('12345678', 8),
    })

    const { user } = await sut.execute({
      userId,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
