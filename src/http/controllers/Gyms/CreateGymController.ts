import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateGym } from '~src/services/factories/makeCreateGymService'

export async function CreateGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { name, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  const createGymService = makeCreateGym()
  await createGymService.execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
