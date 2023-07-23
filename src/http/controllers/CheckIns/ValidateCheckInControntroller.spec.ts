import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '~src/app'
import { prisma } from '~src/lib/prisma'
import { createAndAuthenticateUser } from '~src/utils/test/createAndAuthenticateUser'

describe('Validate Check In Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to validate check-in', async () => {
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

    let checkIn = await prisma.checkIn.create({
      data: {
        gymId: gym.id,
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    })

    expect(response.statusCode).toEqual(204)
    expect(checkIn.validatedAt).toEqual(expect.any(Date))
  })
})
