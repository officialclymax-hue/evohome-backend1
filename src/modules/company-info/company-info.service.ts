import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CompanyInfoService {
  constructor(private prisma: PrismaService) {}
  async list() {
    const row = await this.prisma.companyInfo.findUnique({ where: { id: 1 } });
    return row ? [row] : [];
  }
  update(dto: any) {
    return this.prisma.companyInfo.upsert({
      where: { id: 1 },
      update: dto,
      create: { id: 1, name: dto.name || 'EvoHome Improvements Ltd', phone: dto.phone || '', email: dto.email || '' }
    });
  }
}
