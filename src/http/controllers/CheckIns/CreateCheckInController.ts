import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInService } from '~src/services/factories/makeCheckInService'

export async function CreateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().cuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkInService = makeCheckInService()
  await checkInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
