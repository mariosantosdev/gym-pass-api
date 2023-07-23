import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUserCheckIns } from '~src/services/factories/makeFetchUserCheckInsHistoryService'

export async function GetCheckInHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1, 'A página deve ser no mínimo 1').default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const userCheckInsHistory = makeFetchUserCheckIns()
  const { checkIns } = await userCheckInsHistory.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
