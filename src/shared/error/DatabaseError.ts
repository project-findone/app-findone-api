import { PrismaClientInitializationError } from '@prisma/client/runtime'
import { AppError } from './AppError'

export class DatabaseError {
  private message = 'Não foi possível realizar a invocação com o banco de dados'
  constructor (err: any) {
    if (err instanceof PrismaClientInitializationError) {
      this.message = 'Não foi possível realizar a comunicação com o banco de dados'
    }
    throw new AppError(this.message, 500, 'Database Error')
  }
}
