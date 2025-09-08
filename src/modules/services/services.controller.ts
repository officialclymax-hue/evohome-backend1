import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('api/services')
export class ServicesController {
  constructor(private svc: ServicesService) {}

  // PUBLIC
  @Get()
  async list(@Query('category') category?: string) {
    return this.svc.list({ category });
  }

  // PUBLIC: accepts either ID or slug
  @Get(':id')
  async byIdOrSlug(@Param('id') id: string) {
    return this.svc.byIdOrSlug(id);
  }

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
