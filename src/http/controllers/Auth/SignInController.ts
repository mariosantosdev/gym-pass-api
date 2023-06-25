import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '~src/repositores/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '~src/errors/InvalidCredentialsError'
import { SignInService } from '~src/services/SignInService'

export async function SignInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = signInBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const signInUseCase = new SignInService(usersRepository)
    await signInUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send()
    }

    throw error
  }

  return reply.status(200).send()
}
