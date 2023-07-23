import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '~src/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: 'ADMIN' | 'MEMBER' = 'MEMBER',
) {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('12345678', 8),
      role,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: user.email,
    password: '12345678',
  })

  const { token } = authResponse.body

  return { token, email: user.email }
}
