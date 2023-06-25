import { PrismaUsersRepository } from '~src/repositores/prisma/prisma-users-repository'
import { SignInService } from '../SignInService'

export function makeSignInService() {
  const usersRepository = new PrismaUsersRepository()
  const signInService = new SignInService(usersRepository)

  return signInService
}
