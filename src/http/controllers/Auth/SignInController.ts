import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '~src/errors/InvalidCredentialsError'
import { makeSignInService } from '~src/services/factories/makeSignInService'

export async function SignInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = signInBodySchema.parse(request.body)

  try {
    const signInService = makeSignInService()
    const { user } = await signInService.execute({ email, password })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send()
    }

    throw error
  }
}
