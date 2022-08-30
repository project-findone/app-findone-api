import { container } from 'tsyringe'

import { EtherealMailProvider } from './Implementations/EtherealMailProvider'
import { IMailProvider } from './Models/IMailProvider'

container.registerSingleton<IMailProvider>(
  'EtherealMailProvider',
  EtherealMailProvider
)
