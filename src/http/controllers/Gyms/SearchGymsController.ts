import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymsService } from '~src/services/factories/makeSearchGymsService'

export async function SearchGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1, 'A página deve ser no mínimo 1').default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(request.body)

  const searchGymsService = makeSearchGymsService()
  const gyms = await searchGymsService.execute({
    query: q,
    page,
  })

  return reply.status(200).send({ gyms })
}
