import { diskStorage } from 'multer'
import { extname } from 'path'

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix =  Math.round(Math.random() * 1e5)
      const extension = extname(file.originalname)
      const customFilename = `${uniqueSuffix}${extension}`
      callback(null, customFilename)
    },
  }),
}
