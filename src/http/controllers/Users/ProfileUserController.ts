import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserProfile } from '~src/services/factories/makeGetUserProfileService'

export async function ProfileUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfile()

  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  })
}
