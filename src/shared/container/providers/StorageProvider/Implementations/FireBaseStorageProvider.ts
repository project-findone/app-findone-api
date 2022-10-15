import fs from 'fs'
import path from 'path'
import { storage } from '@config/firebase'
import { ref, uploadBytes, deleteObject } from 'firebase/storage'
import uploadConfig from '@config/Upload'
import IStorageProvider from '../Models/IStorageProvider'

class FireBaseStorageProvider implements IStorageProvider {
  public async saveFile (file: string, pathName: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)
    const fileContent = await fs.promises.readFile(originalPath)

    const storageRef = ref(storage, `${pathName}/${file}`)
    await uploadBytes(storageRef, fileContent)

    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile (file: string, pathName: string): Promise<void> {
    const storageRef = ref(storage, `${pathName}/${file}`)
    await deleteObject(storageRef)
  }
}
export default FireBaseStorageProvider
