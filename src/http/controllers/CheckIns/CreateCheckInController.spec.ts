import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '~src/app'
import { prisma } from '~src/lib/prisma'
import { createAndAuthenticateUser } from '~src/utils/test/createAndAuthenticateUser'

describe('Create CheckIn Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        name: 'Caltech Gym',
        description: 'Lorem impsun',
        phone: '1199999999',
        latitude: -20.7321763,
        longitude: -44.7698854,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -20.7321763,
        longitude: -44.7698854,
      })

    expect(response.statusCode).toEqual(201)
  })
})
