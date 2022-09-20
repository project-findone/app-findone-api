import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'
import path from 'path'
import mime from 'mime-types'
import { Request } from 'express'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

function fileFilter () {
  return (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const type = String(mime.extension(file.mimetype))
    const conditions = ['png', 'jpg', 'jpeg']
    if (conditions.includes(`${type}`)) {
      cb(null, true)
    }
    cb(null, false)
  }
}

interface IUploadConfig {
  driver: 'firebase' | 'disk'

  tmpFolder: string
  uploadsFolder: string

  multer: {
    storage: StorageEngine
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => void
  }

  config: {
    disk: {}
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      }
    }),
    fileFilter: fileFilter()
  },

  config: {
    disk: {}
  }

} as IUploadConfig
