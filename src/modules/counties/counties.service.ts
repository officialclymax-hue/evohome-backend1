import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import slugify from 'slugify';

@Injectable()
export class CountiesService {
  constructor(private prisma: PrismaService) {}

  list(primary?: boolean) {
    return this.prisma.county.findMany({
      where: typeof primary === 'boolean' ? { isPrimary: primary } : undefined,
      orderBy: { name: 'asc' }
    });
  }

  async byIdOrSlug(idOrSlug: string) {
    let c = await this.prisma.county.findUnique({ where: { id: idOrSlug } });
    if (!c) c = await this.prisma.county.findUnique({ where: { slug: idOrSlug } });
    if (!c) throw new NotFoundException('County not found');
    return c;
  }

  create(dto: any) {
    const slug = dto.slug || slugify(dto.name, { lower: true, strict: true });
    return this.prisma.county.create({ data: { ...dto, slug } });
  }

  update(id: string, dto: any) {
    if (dto.name && !dto.slug) dto.slug = slugify(dto.name, { lower: true, strict: true });
    return this.prisma.county.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.county.delete({ where: { id } });
  }
}
