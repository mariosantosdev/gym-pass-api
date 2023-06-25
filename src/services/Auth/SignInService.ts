import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { InvalidCredentialsError } from '~src/errors/InvalidCredentialsError'
import { UsersRepository } from '~src/repositores/users-repository'

interface SignInServiceRequest {
  email: string
  password: string
}

interface SignInServiceResponse {
  user: User
}

export class SignInService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: SignInServiceRequest): Promise<SignInServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
