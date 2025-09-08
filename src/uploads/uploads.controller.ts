import { Controller, Post, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { Request } from 'express';

@Controller('api/uploads')
export class UploadsController {
  constructor(private svc: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const base = process.env.PUBLIC_BASE_URL || `${proto}://${host}`;
    return this.svc.handle(file, String(base));
  }
}
