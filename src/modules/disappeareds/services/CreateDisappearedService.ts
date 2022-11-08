import { inject, injectable } from 'tsyringe'

import { Disappeared } from '../infra/prisma/entites/Disappeared'
import { ICreateDisappearedDTO } from '../dtos/ICreateDisappearedDTO'

import { IDisappearedRepository } from '../repositories/IDisappearedRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { createDisappearedSchema, createCaseSchema } from '../infra/helpers/CreateDisappearedValidationSchema'

import { AppError } from '@shared/error/AppError'
import { JoiValidationError } from '@shared/error/ValidationError'
import { birthDateFormat } from '@shared/helpers/BirthDateFormat'

@injectable()
class CreateDisappearedService {
  constructor (
    @inject('DisappearedRepository')
    private disappearedRepository: IDisappearedRepository,

    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async handle (request: ICreateDisappearedDTO, ownerID: string): Promise<Disappeared | Disappeared[] | undefined | {} | []> {
    try {
      const { characteristics, disappeared, disappeared: { birthDate, personCPF }, case: caseDisappeared, passCheck } = request
      if (!disappeared || !caseDisappeared || !characteristics) throw new AppError('Alguns parâmetros estão ausentes', 400)
      if (!ownerID) throw new AppError('Não foi possível acessar o ID do responsável', 500)

      const { error: errDisappeared } = createDisappearedSchema.validate(disappeared)

      if (errDisappeared !== undefined) {
        throw new JoiValidationError(errDisappeared)
      }

      const { error: errCase } = createCaseSchema.validate(caseDisappeared)

      if (errCase !== undefined) {
        throw new JoiValidationError(errCase)
      }

      if (characteristics.length < 3 || characteristics.length > 4) {
        throw new AppError('Coloque 3 caracteristicas no mínimo e no máximo 4', 400)
      }

      if (!passCheck) {
        const disappeareds = await this.disappearedRepository.findSimilarDisappeareds(request)
        if (disappeareds.length > 0) return { status: 'Alert', disappeareds }
      }

      if (birthDate) {
        const { dateFormatted } = birthDateFormat(birthDate as string, false)
        request.disappeared.birthDate = dateFormatted
      }

      if (personCPF) {
        const userCPFExists = await this.userRepository.findByCPF(personCPF)
        if (userCPFExists) throw new AppError('Este CPF já está sendo utilizado.', 403)
      }

      const ownerFounded = await this.userRepository.findByID(ownerID)
      if (!ownerFounded) throw new AppError('O responsável informado não existe.', 404)

      const result = await this.disappearedRepository.create(request, ownerID)

      if (!result) {
        throw new AppError('Houve um erro ao cadastrar o desaparecido.', 500)
      }
      return { status: 'Sucess', disappeared: result }
    } catch (err) {
      if (err instanceof AppError) throw new AppError(err.message, err.statusCode)
      throw new AppError('Houve um erro ao invocar o serviço. Por favor, verifique a estrutura da requisição.')
    }
  }
}

export default CreateDisappearedService
