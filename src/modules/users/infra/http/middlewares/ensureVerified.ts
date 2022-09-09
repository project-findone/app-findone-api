import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class EnsureVerified {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public handle (
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const { email } = request.body

    if (!email) {
      throw new Error('O e-mail não foi informado.')
    }

    this.userRepository.findByEmail(email).then(user => {
      if (user?.verified) {
        next()
      }
      throw new Error('O e-mail deve estar verificado para realizar o login.')
    }).catch(() => {
      throw new Error('O e-mail não existe.')
    })
  }
}
