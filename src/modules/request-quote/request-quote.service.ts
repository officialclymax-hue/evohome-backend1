import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class RequestQuoteService {
  constructor(private prisma: PrismaService) {}

  get() { return this.prisma.requestQuoteSettings.findUnique({ where: { id: 1 } }); }

  update(dto: any) {
    return this.prisma.requestQuoteSettings.upsert({
      where: { id: 1 },
      update: dto,
      create: { id: 1, ...dto }
    });
  }
}
