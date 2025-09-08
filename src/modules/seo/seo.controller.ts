import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SeoService } from './seo.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/seo')
export class SeoController {
  constructor(private svc: SeoService) {}

  // PUBLIC: find by route
  @Get()
  list(@Query('route') route?: string) { return this.svc.list(route); }

  @Get(':id')
  one(@Param('id') id: string) { return this.svc.one(id); }

  // ADMIN
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR','OWNER')
  create(@Body() dto: any) { return this.svc.create(dto); }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR','OWNER')
  update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto); }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
