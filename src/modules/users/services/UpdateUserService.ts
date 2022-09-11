import { inject, injectable } from 'tsyringe'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { User } from '../infra/prisma/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { hash } from 'bcrypt'
import { updateUserSchema } from '../infra/helpers/UpdateUserValidationSchema'

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
      throw new Error(`Alguns parâmetros estão ausentes' ${String(error)}`)
    }

    if (email) {
      const userByEmail = await this.userRepository.findByEmail(email)

      if (userByEmail) {
        throw new Error('Esse e-mail está indisponível.')
      }

      request.verified = false
    }

    if (password) {
      const hashedPassword = await hash(password, 12)

      if (!hashedPassword) {
        throw new Error('Houve um erro ao criptografar a nova senha.')
      }

      request.password = hashedPassword
    }

    const user = await this.userRepository.update(request, personID)

    if (!user) {
      throw new Error('Houve um erro ao alterar o usuário.')
    }

    const { password: _, ...response } = user

    return response
  }
}

export default UpdateUserService
