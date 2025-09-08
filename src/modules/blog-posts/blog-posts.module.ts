import { Module } from '@nestjs/common';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [BlogPostsController],
  providers: [BlogPostsService, PrismaService],
})
export class BlogPostsModule {}
