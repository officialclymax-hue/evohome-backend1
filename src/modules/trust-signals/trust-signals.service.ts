import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class TrustSignalsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.trustSignal.findMany({ orderBy: { order: 'asc' } });
  }

  async one(id: string) {
    const rec = await this.prisma.trustSignal.findUnique({ where: { id } });
    if (!rec) throw new NotFoundException('Not found');
    return rec;
  }

  create(dto: any) { return this.prisma.trustSignal.create({ data: dto }); }
  update(id: string, dto: any) { return this.prisma.trustSignal.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.trustSignal.delete({ where: { id } }); }
}
