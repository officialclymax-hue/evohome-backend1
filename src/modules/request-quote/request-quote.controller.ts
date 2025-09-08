import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { RequestQuoteService } from './request-quote.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/request-quote')
export class RequestQuoteController {
  constructor(private svc: RequestQuoteService) {}

  // PUBLIC
  @Get()
  get() { return this.svc.get(); }

  // ADMIN
  @Patch('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR','OWNER')
  update(@Body() dto: any) { return this.svc.update(dto); }
}
