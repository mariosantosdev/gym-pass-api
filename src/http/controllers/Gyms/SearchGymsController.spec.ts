import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '~src/app'
import { createAndAuthenticateUser } from '~src/utils/test/createAndAuthenticateUser'

describe('Search Gyms Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Caltech Gym',
        description: 'Lorem impsun',
        phone: '1199999999',
        latitude: -20.7321763,
        longitude: -44.7698854,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Havard Gym',
        description: 'Lorem impsun',
        phone: '1199999999',
        latitude: -20.7321763,
        longitude: -44.7698854,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Caltech',
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
