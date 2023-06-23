import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '~src/repositores/prisma-users-repository'

interface RegisterUserServiceRequest {
  name: string
  email: string
  password: string
}

export async function RegisterUserService({
  name,
  email,
  password,
}: RegisterUserServiceRequest) {
  const prismaUsersRepository = new PrismaUsersRepository()

  const emailAlreadyUsed = await prismaUsersRepository.findByEmail(email)
  if (emailAlreadyUsed) throw new Error('Email already used')

  const passwordHash = await hash(password, 8)

  await prismaUsersRepository.create({ name, email, password: passwordHash })
}
