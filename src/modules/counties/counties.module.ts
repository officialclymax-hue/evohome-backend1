import { Module } from '@nestjs/common';
import { CountiesController } from './counties.controller';
import { CountiesService } from './counties.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [CountiesController],
  providers: [CountiesService, PrismaService],
})
export class CountiesModule {}
