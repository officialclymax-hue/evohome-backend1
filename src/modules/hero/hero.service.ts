import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.heroSlide.findMany({ where: { enabled: true }, orderBy: { order: 'asc' } });
  }

  async one(id: string) {
    const rec = await this.prisma.heroSlide.findUnique({ where: { id } });
    if (!rec) throw new NotFoundException('Not found');
    return rec;
  }

  create(dto: any) { return this.prisma.heroSlide.create({ data: dto }); }
  update(id: string, dto: any) { return this.prisma.heroSlide.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.heroSlide.delete({ where: { id } }); }
}
