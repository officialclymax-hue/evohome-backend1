import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/blog-posts')
export class BlogPostsController {
  constructor(private svc: BlogPostsService) {}

  // PUBLIC
  @Get()
  list(@Query('q') q?: string, @Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.svc.list(q, Number(limit) || 20, Number(offset) || 0);
  }

  // PUBLIC: id or slug
  @Get(':id')
  one(@Param('id') id: string) {
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
