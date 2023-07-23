import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '~src/app'
import { createAndAuthenticateUser } from '~src/utils/test/createAndAuthenticateUser'

describe('Create Gym Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Caltech Gym',
        description: 'Lorem impsun',
        phone: '1199999999',
        latitude: -20.7321763,
        longitude: -44.7698854,
      })

    expect(response.statusCode).toEqual(201)
  })
})
