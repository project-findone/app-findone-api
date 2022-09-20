import { container } from 'tsyringe'

import './providers/MailProvider'
import './providers/StorageProvider'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { DisappearedRepository } from '@modules/disappeareds/infra/prisma/repositories/DisappearedRepository'
import { IDisappearedRepository } from '@modules/disappeareds/repositories/IDisappearedRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IDisappearedRepository>(
  'DisappearedRepository',
  DisappearedRepository
)
