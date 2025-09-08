import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import slugify from 'slugify';

@Injectable()
export class BlogPostsService {
  constructor(private prisma: PrismaService) {}

  async list(q: string|undefined, take: number, skip: number) {
    const where = q ? {
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { excerpt: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
      ]
    } : undefined;
    const [items, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({ where, orderBy: { date: 'desc' }, take, skip }),
      this.prisma.blogPost.count({ where })
    ]);
    return { data: items, total };
  }

  async byIdOrSlug(idOrSlug: string) {
    let p = await this.prisma.blogPost.findUnique({ where: { id: idOrSlug } });
    if (!p) p = await this.prisma.blogPost.findUnique({ where: { slug: idOrSlug } });
    if (!p) throw new NotFoundException('Post not found');
    return p;
  }

  create(dto: any) {
    const slug = dto.slug || slugify(dto.title, { lower: true, strict: true });
    return this.prisma.blogPost.create({ data: { ...dto, slug } });
  }

  update(id: string, dto: any) {
    if (dto.title && !dto.slug) dto.slug = slugify(dto.title, { lower: true, strict: true });
    return this.prisma.blogPost.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
