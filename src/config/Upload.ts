import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import mime from 'mime-types'
import { Request } from 'express'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

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

export default {
  directory: tmpFolder,

  fileFilter: fileFilter(),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })

}
