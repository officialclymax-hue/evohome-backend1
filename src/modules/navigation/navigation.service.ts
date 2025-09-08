import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class NavigationService {
  constructor(private prisma: PrismaService) {}

  list(location?: string) {
    return this.prisma.navigationItem.findMany({
      where: location ? { OR: [{ location }, { location: 'both' }] } : undefined,
      orderBy: [{ order: 'asc' }, { label: 'asc' }]
    });
  }

  async one(id: string) {
    const rec = await this.prisma.navigationItem.findUnique({ where: { id } });
    if (!rec) throw new NotFoundException('Not found');
    return rec;
  }

  create(dto: any) { return this.prisma.navigationItem.create({ data: dto }); }
  update(id: string, dto: any) { return this.prisma.navigationItem.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.navigationItem.delete({ where: { id } }); }
}
