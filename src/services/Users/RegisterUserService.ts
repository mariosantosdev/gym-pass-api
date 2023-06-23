import { hash } from 'bcryptjs'
import { UsersRepository } from '~src/repositores/users-repository'

interface RegisterUserServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserServiceRequest) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)
    if (emailAlreadyExists) throw new Error('Email already exists')

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({ name, email, password: passwordHash })
  }
}
