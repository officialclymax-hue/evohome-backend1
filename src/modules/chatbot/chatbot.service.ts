import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ChatbotService {
  constructor(private prisma: PrismaService) {}

  get() { return this.prisma.chatbotConfig.findUnique({ where: { id: 1 } }); }

  update(dto: any) {
    return this.prisma.chatbotConfig.upsert({
      where: { id: 1 },
      update: dto,
      create: { id: 1, ...dto }
    });
  }
}
