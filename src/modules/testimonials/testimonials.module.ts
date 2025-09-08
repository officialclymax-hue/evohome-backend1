import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [TestimonialsController],
  providers: [TestimonialsService, PrismaService],
})
export class TestimonialsModule {}
