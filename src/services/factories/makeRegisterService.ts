import { PrismaUsersRepository } from '~src/repositores/prisma/prisma-users-repository'
import { RegisterService } from '../RegisterService'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(usersRepository)

  return registerService
}
