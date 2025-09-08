import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private svc: TestimonialsService) {}

  // PUBLIC
  @Get()
  list(@Query('service') service?: string) { return this.svc.list(service); }

  @Get(':id')
  one(@Param('id') id: string) { return this.svc.byId(id); }

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
