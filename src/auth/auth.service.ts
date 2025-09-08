import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async bootstrapAdmin() {
    const email = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASSWORD!;
    const exists = await this.prisma.adminUser.findUnique({ where: { email } });
    if (exists) return { ok: true, message: 'Admin exists' };
    const passwordHash = await bcrypt.hash(password, 10);
    await this.prisma.adminUser.create({ data: { email, passwordHash, role: 'OWNER' } });
    return { ok: true, message: 'Admin created' };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.adminUser.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ sub: user.id, role: user.role, email: user.email });
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
