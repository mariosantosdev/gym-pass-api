import { z } from 'zod'
import { prisma } from '~src/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'

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

  const passwordHash = await hash(password, 8)

  const emailAlreadyUsed = await prisma.user.findUnique({
    where: { email },
  })

  if (emailAlreadyUsed) return reply.status(409).send()

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  })

  return reply.status(201).send()
}
