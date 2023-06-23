import { prisma } from '~src/lib/prisma'
import { hash } from 'bcryptjs'

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
  const passwordHash = await hash(password, 8)

  const emailAlreadyUsed = await prisma.user.findUnique({
    where: { email },
  })

  if (emailAlreadyUsed) throw new Error('Email already used')

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  })
}
