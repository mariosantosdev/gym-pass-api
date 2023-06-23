import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUserService } from '~src/services/Users/RegisterUserService'

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
    await RegisterUserService({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
