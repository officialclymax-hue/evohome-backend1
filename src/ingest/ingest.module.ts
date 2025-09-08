import { Module } from '@nestjs/common';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [IngestController],
  providers: [IngestService, PrismaService],
})
export class IngestModule {}
