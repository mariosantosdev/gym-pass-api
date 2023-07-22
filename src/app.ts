import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { Routes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(Routes)

app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(422)
      .send({ message: 'Validation Errors', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') console.error(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
})
