import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/company-info')
export class CompanyInfoController {
  constructor(private svc: CompanyInfoService) {}

  // PUBLIC (as array for RA compatibility; also easy for frontend)
  @Get()
  list() { return this.svc.list(); }

  // ADMIN edit singleton (id=1)
  @Patch('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR','OWNER')
  update(@Body() dto: any) { return this.svc.update(dto); }
}
