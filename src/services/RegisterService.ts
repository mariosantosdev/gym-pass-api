import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '~src/errors/UserAlreadyExistsError'
import { UsersRepository } from '~src/repositores/users-repository'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)
    if (emailAlreadyExists) throw new UserAlreadyExistsError()

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return user
  }
}
