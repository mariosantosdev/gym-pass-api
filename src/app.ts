import fastify from 'fastify'

import { Routes } from './http/routes'

export const app = fastify()

app.register(Routes)
