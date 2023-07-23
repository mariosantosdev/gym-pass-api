import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '~src/app'
import { createAndAuthenticateUser } from '~src/utils/test/createAndAuthenticateUser'

describe('Nearby Gyms Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Caltech Gym',
        description: 'Lorem impsun',
        phone: '1199999999',
        latitude: 34.1385508,
        longitude: -118.1294148,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Havard Gym',
        description: 'Lorem impsun',
        phone: '1199999999',
        latitude: 34.0876692,
        longitude: -118.4387164,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 34.142849,
        longitude: -118.127913,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Caltech Gym',
      }),
    ])
  })
})
