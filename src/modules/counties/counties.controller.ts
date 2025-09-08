import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CountiesService } from './counties.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/counties')
export class CountiesController {
  constructor(private svc: CountiesService) {}

  // PUBLIC
  @Get()
  list(@Query('primary') primary?: string) {
    return this.svc.list(primary === 'true');
  }

  // PUBLIC id or slug
  @Get(':id')
  get(@Param('id') id: string) {
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
