import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { ZodError } from 'zod'
import { env } from './env'
import { userRoutes } from './http/controllers/Users/routes'
import { authRoutes } from './http/controllers/Auth/routes'
import { gymsRoutes } from './http/controllers/Gyms/routes'
import { checkInsRoutes } from './http/controllers/CheckIns/routes'

export const app = fastify()

app.register(authRoutes)
app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '30m',
  },
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(422)
      .send({ message: 'Validation Errors', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') console.error(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
})
