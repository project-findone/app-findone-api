import { inject, injectable } from 'tsyringe'

import { EntityAttachment } from '../infra/prisma/entities/Attachment'

import IStorageProvider from '@shared/container/providers/StorageProvider/Models/IStorageProvider'

import { AppError } from '@shared/error/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface IRequest {
  fileName: string | undefined
  contributionID: string
}

@injectable()
export class SendAttachmentService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async handle ({ contributionID, fileName }: IRequest): Promise<EntityAttachment | undefined | {}> {
    const path = 'attachment'

    if (!contributionID || typeof contributionID !== 'string') {
      throw new AppError(' Não foi possível acessar o ID da contribuição.', 500)
    }

    if (fileName) {
      const newFileName = await this.storageProvider.saveFile(fileName, path)
      const attachment = await this.userRepository.sendAttachment(newFileName, contributionID)
      return attachment
    }

    throw new AppError('Não foi possível enviar o anexo.', 500)
  }
}

export default SendAttachmentService
