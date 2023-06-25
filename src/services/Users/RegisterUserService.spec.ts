import { describe, it, expect } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUserService } from './RegisterUserService'
import { InMemoryUsersRepository } from '~src/repositores/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '~src/errors/UserAlreadyExistsError'

describe('Register User Service', () => {
  it('should hash the user password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserService = new RegisterUserService(inMemoryUsersRepository)

    const user = await registerUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const matchPassword = await compare('12345678', user.password)

    expect(matchPassword).toBe(true)
  })

  it('should not be able to register a user with an email that already exists', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserService = new RegisterUserService(inMemoryUsersRepository)

    const email = 'johndoe@email.com'

    await registerUserService.execute({
      name: 'John Doe',
      email,
      password: '12345678',
    })

    await expect(() =>
      registerUserService.execute({
        name: 'John Doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register a new user', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserService = new RegisterUserService(inMemoryUsersRepository)

    const user = await registerUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345678',
    })

    expect(user).toHaveProperty('id')
  })
})
