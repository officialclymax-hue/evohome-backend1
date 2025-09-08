import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  list(service?: string) {
    return this.prisma.testimonial.findMany({
      where: service ? { service } : undefined,
      orderBy: { date: 'desc' }
    });
  }

  async byId(id: string) {
    const t = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Not found');
    return t;
  }

  create(dto: any) { return this.prisma.testimonial.create({ data: dto }); }
  update(id: string, dto: any) { return this.prisma.testimonial.update({ where: { id }, data: dto }); }
  remove(id: string) { return this.prisma.testimonial.delete({ where: { id } }); }
}
