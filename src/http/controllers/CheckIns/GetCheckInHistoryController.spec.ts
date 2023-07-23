import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '~src/app'
import { prisma } from '~src/lib/prisma'
import { createAndAuthenticateUser } from '~src/utils/test/createAndAuthenticateUser'

describe('Get CheckIn History Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list history of check-ins', async () => {
    const { token, email } = await createAndAuthenticateUser(app, 'ADMIN')

    const user = await prisma.user.findFirstOrThrow({ where: { email } })

    const gym = await prisma.gym.create({
      data: {
        name: 'Caltech Gym',
        description: 'Lorem impsun',
        phone: '1199999999',
        latitude: -20.7321763,
        longitude: -44.7698854,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          userId: user.id,
        },
        {
          gymId: gym.id,
          userId: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ gymId: gym.id, userId: user.id }),
      expect.objectContaining({ gymId: gym.id, userId: user.id }),
    ])
  })
})
