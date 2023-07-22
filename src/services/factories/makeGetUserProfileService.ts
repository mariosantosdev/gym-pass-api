import { PrismaUsersRepository } from '~src/repositores/prisma/prisma-users-repository'
import { GetUserProfileService } from '../GetUserProfileService'

export function makeGetUserProfile() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileService(usersRepository)

  return useCase
}
