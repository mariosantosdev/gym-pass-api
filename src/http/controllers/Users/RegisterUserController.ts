import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUserService } from '~src/services/Users/RegisterUserService'
import { PrismaUsersRepository } from '~src/repositores/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '~src/errors/UserAlreadyExistsError'

export async function RegisterUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUserService(usersRepository)
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send()
    }

    throw error
  }

  return reply.status(201).send()
}
