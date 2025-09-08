import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  list(filter: { category?: string }) {
    return this.prisma.service.findMany({
      where: { category: filter.category || undefined },
      orderBy: { name: 'asc' },
    });
  }

  async bySlug(slug: string) {
    const svc = await this.prisma.service.findUnique({ where: { slug } });
    if (!svc) throw new NotFoundException('Service not found');
    return svc;
  }

  create(dto: any) {
    const slug = dto.slug || slugify(dto.name, { lower: true, strict: true });
    return this.prisma.service.create({ data: { ...dto, slug } });
  }

  update(id: string, dto: any) {
    if (dto.slug === '') delete dto.slug;
    if (dto.name && !dto.slug) dto.slug = slugify(dto.name, { lower: true, strict: true });
    return this.prisma.service.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
