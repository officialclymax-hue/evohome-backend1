import { Module } from '@nestjs/common';
import { GalleryImagesController } from './gallery-images.controller';
import { GalleryImagesService } from './gallery-images.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [GalleryImagesController],
  providers: [GalleryImagesService, PrismaService],
})
export class GalleryImagesModule {}
