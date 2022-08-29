
import { User } from '@modules/users/infra/prisma/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface Request{
  email: string
  password: string
}

interface Response {
  userResponse: User | {}
  token: string
}

@injectable()
export class AuthenticateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async handle (request: Request): Promise<Response | null> {
    const { email, password } = request

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('O e-mail informado não existe.')
    }

    const passMatched = await compare(password, user.password)

    if (!passMatched) {
      throw new Error('Os parâmetros email/senha não coincidem.')
    }
    const token = sign({}, 'cecdf269f5769fdc23e96de1ef488e55', {
      subject: String(user.person_id),
      expiresIn: '1d'

    })

    const { password: _, ...userResponse } = user

    return {
      userResponse,
      token
    }
  }
}
