import { inject, injectable } from 'tsyringe'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { User } from '../infra/prisma/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { hash } from 'bcrypt'
import { updateUserSchema } from '../infra/helpers/UpdateUserValidationSchema'

import { AppError } from '@shared/error/AppError'
import { JoiValidationError } from '@shared/error/ValidationError'

@injectable()
export class UpdateUserService {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (request: IUpdateUserDTO, personID: number): Promise<User | undefined | {}> {
    const { password, email } = request

    const requestParams: Omit<IUpdateUserDTO, 'verified'> = request

    const { error } = updateUserSchema.validate(requestParams)

    if (error !== undefined) {
      throw new JoiValidationError(error)
    }

    if (email) {
      const userByEmail = await this.userRepository.findByEmail(email)

      if (userByEmail) {
        throw new AppError('Esse e-mail está indisponível.', 404)
      }

      request.verified = false
    }

    if (password) {
      const hashedPassword = await hash(password, 12)

      if (!hashedPassword) {
        throw new AppError('Houve um erro ao criptografar a nova senha.', 500)
      }

      request.password = hashedPassword
    }

    const user = await this.userRepository.update(request, personID)

    if (!user) {
      throw new AppError('Houve um erro ao alterar o usuário.', 500)
    }

    const { password: _, ...response } = user

    return response
  }
}

export default UpdateUserService
