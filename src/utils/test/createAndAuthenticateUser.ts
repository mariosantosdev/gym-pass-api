import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const email = 'johndoe@example.com'

  await request(app.server).post('/users').send({
    name: 'John Doe',
    email,
    password: '12345678',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: '12345678',
  })

  const { token } = authResponse.body

  return { token, email }
}
