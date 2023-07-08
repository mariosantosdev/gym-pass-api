import { prisma } from '~src/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({ data })
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data,
    })

    return checkIn
  }

  async findById(checkInId: string) {
    return await prisma.checkIn.findUnique({ where: { id: checkInId } })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async countByUserId(userId: string) {
    return await prisma.checkIn.count({ where: { userId } })
  }
}
