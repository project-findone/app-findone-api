import { inject, injectable } from 'tsyringe'
import { User } from '../infra/prisma/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/Models/IStorageProvider'

import { AppError } from '@shared/error/AppError'

interface IRequest {
  fileName: string | undefined
  personID: number
}

@injectable()
export class UpdateUserImageService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async handle ({ personID, fileName }: IRequest): Promise<User | undefined | {}> {
    const { personImage } = await this.userRepository.findByID(personID)
    const path = 'images'

    if (personImage) {
      await this.storageProvider.deleteFile(personImage, path)
    }
    if (fileName) {
      const newFileName = await this.storageProvider.saveFile(fileName, path)
      const user = await this.userRepository.updateImage(newFileName, personID)
      return { message: user }
    }

    throw new AppError('Não foi possível atualizar a imagem do usuário.', 400)
  }
}

export default UpdateUserImageService
