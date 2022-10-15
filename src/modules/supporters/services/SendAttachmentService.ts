import { inject, injectable } from 'tsyringe'
import { EntityAttachment } from '../infra/prisma/entites/Attachment'
import { ISupportersRepository } from '../repositories/ISupportersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/Models/IStorageProvider'

import { AppError } from '@shared/error/AppError'

interface IRequest {
  fileName: string | undefined
  contributionID: number
}

@injectable()
export class SendAttachmentService {
  constructor (
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async handle ({ contributionID, fileName }: IRequest): Promise<EntityAttachment | undefined | {}> {
    const path = 'attachment'

    if (!contributionID || typeof contributionID !== 'number') {
      throw new AppError(' Não foi possível acessar o ID da contribuição.', 400)
    }

    if (fileName) {
      const newFileName = await this.storageProvider.saveFile(fileName, path)
      const attachment = await this.supportersRepository.sendAttachment(newFileName, contributionID)
      return attachment
    }

    throw new AppError('Não foi possível enviar o anexo.', 400)
  }
}

export default SendAttachmentService
