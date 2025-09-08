import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FormSubmissionsService } from './form-submissions.service';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/form-submissions')
export class FormSubmissionsController {
  constructor(private svc: FormSubmissionsService) {}

  // Public submission (Contact + Quote forms)
  @Post()
  async submit(@Body() body: any) {
    return this.svc.capture(body);
  }

  // Admin list
  @Get()
  @Roles('VIEWER','EDITOR','OWNER')
  list(@Query('q') q?: string) {
    return this.svc.list(q);
  }
}
