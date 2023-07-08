import { prisma } from '~src/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(gymId: string) {
    return await prisma.gym.findUnique({ where: { id: gymId } })
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }

  async searchMany(query: string, page: number) {
    return await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async create(data: Prisma.GymCreateInput) {
    return await prisma.gym.create({ data })
  }
}
