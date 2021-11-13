import multer from "multer";
import { extensoesPermitidas } from "./DocumentosEnum";
import path from 'path';
import AppError from "../../errors/AppError";

const armazenamento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './api/uploads/');
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname).toLowerCase()); /* Tipo do arquivo/campo + data em unix time com número aleatório + a extensão do arquivo */
  }
});

const upload = multer({
  storage: armazenamento,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname).toLowerCase();
    if (!extensoesPermitidas.includes(ext)
    ) {
      return callback(new AppError(`Somente estas extensões de arquivos são permitidas: ${extensoesPermitidas}`, 400))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 2 * 1000000 /* Em bytes, 1 megabyte == 1000000 */
  }
});

export {
  upload
}
