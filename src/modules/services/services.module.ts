import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { PrismaService } from '../../common/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  controllers: [ServicesController],
  providers: [
    ServicesService, PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    Reflector
  ],
})
export class ServicesModule {}
