import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import path from 'node:path';

export const storage = diskStorage({
  destination(req, file, cb) {
    cb(
      null,
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        '..',
        '..',
        'public',
        'hotels',
        'rooms',
        'images',
      ),
    );
  },
  filename(req, file, cb) {
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
