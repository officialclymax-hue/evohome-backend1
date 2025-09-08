import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/services')
export class ServicesController {
  constructor(private svc: ServicesService) {}

  // public
  @Get()
  async list(@Query('category') category?: string) {
    return this.svc.list({ category });
  }
  @Get(':slug')
  async bySlug(@Param('slug') slug: string) {
    return this.svc.bySlug(slug);
  }

  // admin
  @Post()
  @Roles('EDITOR','OWNER')
  create(@Body() dto: any) { return this.svc.create(dto); }

  @Patch(':id')
  @Roles('EDITOR','OWNER')
  update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto); }

  @Delete(':id')
  @Roles('OWNER')
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
