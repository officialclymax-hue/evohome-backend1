import { Module } from '@nestjs/common';
import { TrustSignalsController } from './trust-signals.controller';
import { TrustSignalsService } from './trust-signals.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [TrustSignalsController],
  providers: [TrustSignalsService, PrismaService],
})
export class TrustSignalsModule {}
