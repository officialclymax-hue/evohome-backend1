import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [HeroController],
  providers: [HeroService, PrismaService],
})
export class HeroModule {}
