import { Module } from '@nestjs/common';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [SeoController],
  providers: [SeoService, PrismaService],
})
export class SeoModule {}
