import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.adminUser.findMany({ select: { id: true, email: true, role: true, createdAt: true } });
  }

  async create(dto: { email: string; password: string; role?: 'OWNER'|'EDITOR'|'VIEWER' }) {
    if (!dto.email || !dto.password) throw new BadRequestException('email and password required');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.prisma.adminUser.create({ data: { email: dto.email, passwordHash, role: dto.role || 'EDITOR' } });
  }

  async update(id: string, dto: { email?: string; role?: 'OWNER'|'EDITOR'|'VIEWER' }) {
    return this.prisma.adminUser.update({ where: { id }, data: dto });
  }

  async changePassword(id: string, password: string) {
    if (!password) throw new BadRequestException('password required');
    const passwordHash = await bcrypt.hash(password, 10);
    return this.prisma.adminUser.update({ where: { id }, data: { passwordHash } });
  }

  remove(id: string) {
    return this.prisma.adminUser.delete({ where: { id } });
  }
}
