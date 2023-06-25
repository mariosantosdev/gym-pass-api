import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '~src/repositores/in-memory/in-memory-users-repository'
import { SignInService } from './SignInService'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '~src/errors/InvalidCredentialsError'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: SignInService

describe('Sign In Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new SignInService(inMemoryUsersRepository)
  })

  it('should be able to sign in', async () => {
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
    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able with wrong password', async () => {
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
