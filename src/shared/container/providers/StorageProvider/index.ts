import { container } from 'tsyringe'
import uploadConfig from '@config/Upload'

import IStorageProvider from './Models/IStorageProvider'
import DiskStorageProvider from './Implementations/DiskStorageProvider'
import FireBaseStorageProvider from './Implementations/FireBaseStorageProvider'

const providers = {
  disk: DiskStorageProvider,
  firebase: FireBaseStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver]
)
