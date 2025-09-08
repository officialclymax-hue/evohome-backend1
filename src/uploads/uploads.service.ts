import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class UploadsService {
  async handle(file: Express.Multer.File, baseUrl: string) {
    const storage = process.env.FILE_STORAGE || 'local';

    if (storage === 'local') {
      const name = randomBytes(8).toString('hex') + '-' + file.originalname.replace(/\s+/g, '_');
      const dest = join(process.cwd(), 'src', 'public', name);
      await writeFile(dest, file.buffer);
      // Return absolute URL even before you know it (computed from request)
      const url = `${baseUrl}/${name}`;
      return { url };
    }

    if (storage === 's3') {
      // TODO: Add S3 upload here if you switch to S3
    }
    if (storage === 'cloudinary') {
      // TODO: Add Cloudinary upload here if you switch to Cloudinary
    }
    return { error: 'Unknown storage' };
  }
}
