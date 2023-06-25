import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterService } from './RegisterService'
import { InMemoryUsersRepository } from '~src/repositores/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '~src/errors/UserAlreadyExistsError'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register User Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(inMemoryUsersRepository)
  })

  it('should hash the user password', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const matchPassword = await compare('12345678', user.password)

    expect(matchPassword).toBe(true)
  })

  it('should not be able to register a user with an email that already exists', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register a new user', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    })

    expect(user).toHaveProperty('id')
  })
})
