import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import path from 'node:path';

export const UPLOADS_DIR = path.join(
  process.cwd(),
  'public',
  'hotels',
  'rooms',
  'images',
);

export const storage = diskStorage({
  destination(_req, _file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename(_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const fileFilter: MulterOptions['fileFilter'] = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (ext && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Недопустимый тип файла'), false);
  }
};
