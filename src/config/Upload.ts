import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'
import path from 'path'
import mime from 'mime-types'
import { Request } from 'express'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

function fileFilter (filter: 'image' | 'doc') {
  return (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const type = String(mime.extension(file.mimetype))
    const conditions = filter !== 'image' ? ['pdf', 'docx'] : ['jpg', 'jpeg', 'png']

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
    images: {
      storage: StorageEngine
      fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => void
    }
    docs: {
      storage: StorageEngine
      fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => void
    }
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
    images: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(10).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      }),
      fileFilter: fileFilter('image')
    },
    docs: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(10).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      }),
      fileFilter: fileFilter('doc')
    }
  },

  config: {
    disk: {}
  }

} as IUploadConfig
