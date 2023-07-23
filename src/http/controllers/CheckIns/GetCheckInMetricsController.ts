import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetUserMetrics } from '~src/services/factories/makeGetUserMetricsService'

export async function GetCheckInMetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricsService = makeGetUserMetrics()
  const { checkInsCount } = await getUserMetricsService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
