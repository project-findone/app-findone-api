import { inject, injectable } from 'tsyringe'
import { User } from '../infra/prisma/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import uploadConfig from 'config/Upload'

import path from 'path'
import fs from 'fs'

interface IRequest {
  fileName: string | undefined
  personID: number
}

@injectable()
export class UpdateUserImageService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle ({ personID, fileName }: IRequest): Promise<User | undefined | {}> {
    const { personImage } = await this.userRepository.findByID(personID)

    if (personImage) {
      const userImageFilePath = path.join(uploadConfig.directory, personImage)
      const userImageFileExists = await fs.promises.stat(userImageFilePath)

      if (userImageFileExists) {
        await fs.promises.unlink(userImageFilePath)
      }
    }

    if (fileName) {
      const user = await this.userRepository.updateImage(fileName, personID)
      return { message: user }
    }

    throw new Error('Não foi possível atualizar a imagem do usuário.')
  }
}

export default UpdateUserImageService
