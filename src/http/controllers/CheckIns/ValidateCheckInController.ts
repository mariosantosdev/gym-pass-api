import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidateCheckIn } from '~src/services/factories/makeValidateCheckInService'

export async function ValidateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInService = makeValidateCheckIn()
  await validateCheckInService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
