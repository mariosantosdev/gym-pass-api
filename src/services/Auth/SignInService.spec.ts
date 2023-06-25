import { describe, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '~src/repositores/in-memory/in-memory-users-repository'
import { SignInService } from './SignInService'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '~src/errors/InvalidCredentialsError'

describe('Sign In Service', () => {
  it('should be able to sign in', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new SignInService(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('12345678', 8),
    })

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '12345678',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able with wrong email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new SignInService(inMemoryUsersRepository)

    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new SignInService(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('12345678', 8),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
