import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/admin-users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUsersController {
  constructor(private svc: AdminUsersService) {}

  @Get()
  @Roles('OWNER')
  list() { return this.svc.list(); }

  @Post()
  @Roles('OWNER')
  create(@Body() dto: any) { return this.svc.create(dto); }

  @Patch(':id')
  @Roles('OWNER')
  update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto); }

  @Patch(':id/password')
  @Roles('OWNER')
  changePassword(@Param('id') id: string, @Body() body: { password: string }) {
    return this.svc.changePassword(id, body.password);
  }

  @Delete(':id')
  @Roles('OWNER')
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
