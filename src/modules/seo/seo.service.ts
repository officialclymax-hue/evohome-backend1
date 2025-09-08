import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class SeoService {
  constructor(private prisma: PrismaService) {}

  async list(route?: string) {
    if (route) {
      const rec = await this.prisma.seoRecord.findUnique({ where: { route } });
      return rec ? [rec] : [];
    }
    return this.prisma.seoRecord.findMany({ orderBy: { route: 'asc' } });
  }

  async one(id: string) {
    const rec = await this.prisma.seoRecord.findUnique({ where: { id } });
    if (!rec) throw new NotFoundException('Not found');
    return rec;
  }

  create(dto: any) { return this.prisma.seoRecord.create({ data: dto }); }
  update(id: string, dto: any) { return this.prisma.seoRecord.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.seoRecord.delete({ where: { id } }); }
}
