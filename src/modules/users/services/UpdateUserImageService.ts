import { inject, injectable } from 'tsyringe'
import { User } from '../infra/prisma/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/Models/IStorageProvider'

import { AppError } from '@shared/error/AppError'

interface IRequest {
  fileName: string | undefined
  userID: string
}

@injectable()
export class UpdateUserImageService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async handle ({ userID, fileName }: IRequest): Promise<User | undefined | {}> {
    try {
      const { personImage } = await this.userRepository.findByID(userID) as User
      const path = 'images'

      if (personImage) {
        await this.storageProvider.deleteFile(personImage, path)
      }
      if (fileName) {
        const newFileName = await this.storageProvider.saveFile(fileName, path)
        const user = await this.userRepository.updateImage(newFileName, userID)
        return { message: user }
      }
    } catch (err) {
      if (err instanceof AppError) throw new AppError(err.message, err.statusCode)
      throw new AppError('Não foi possível atualizar a imagem do usuário.', 500)
    }
  }
}

export default UpdateUserImageService
