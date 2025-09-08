import { Module } from '@nestjs/common';
import { FormSubmissionsController } from './form-submissions.controller';
import { FormSubmissionsService } from './form-submissions.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [FormSubmissionsController],
  providers: [FormSubmissionsService, PrismaService],
})
export class FormSubmissionsModule {}
