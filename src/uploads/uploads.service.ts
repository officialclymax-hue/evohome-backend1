import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class UploadsService {
  async handle(file: Express.Multer.File) {
    const storage = process.env.FILE_STORAGE || 'local';

    if (storage === 'local') {
      const name = randomBytes(8).toString('hex') + '-' + file.originalname.replace(/\s+/g, '_');
      const dest = join(process.cwd(), 'src', 'public', name);
      await writeFile(dest, file.buffer);
      const url = `${process.env.PUBLIC_BASE_URL || ''}/${name}`;
      return { url };
    }

    if (storage === 's3') {
      // put S3 upload code here
    }
    if (storage === 'cloudinary') {
      // use CLOUDINARY_URL env
    }
    return { error: 'Unknown storage' };
  }
}
