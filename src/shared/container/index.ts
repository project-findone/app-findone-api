import { container } from 'tsyringe'

import './providers/MailProvider'
import './providers/StorageProvider'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { DisappearedRepository } from '@modules/disappeareds/infra/prisma/repositories/DisappearedRepository'
import { IDisappearedRepository } from '@modules/disappeareds/repositories/IDisappearedRepository'

import { SupportersRepository } from '@modules/supporters/infra/prisma/repositories/SupportersRepository'
import { ISupportersRepository } from '@modules/supporters/repositories/ISupportersRepository'

import { LostsRepository } from '@modules/losts/infra/prisma/repositories/LostsRepository'
import { ILostsRepository } from '@modules/losts/repositories/ILostsRepository'

import { CasesRepository } from '@modules/case/infra/prisma/repositories/CasesRepository'
import { ICasesRepository } from '@modules/case/repositories/ICasesRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IDisappearedRepository>(
  'DisappearedRepository',
  DisappearedRepository
)

container.registerSingleton<ISupportersRepository>(
  'SupportersRepository',
  SupportersRepository
)

container.registerSingleton<ILostsRepository>(
  'LostsRepository',
  LostsRepository
)

container.registerSingleton<ICasesRepository>(
  'CasesRepository',
  CasesRepository
)
