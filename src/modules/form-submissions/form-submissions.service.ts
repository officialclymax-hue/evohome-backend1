import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class FormSubmissionsService {
  constructor(private prisma: PrismaService) {}

  capture(body: any) {
    const data = {
      firstName: body.firstName || body.name?.split(' ')[0] || null,
      lastName: body.lastName || body.name?.split(' ').slice(1).join(' ') || null,
      email: body.email || null,
      phone: body.phone || null,
      postcode: body.postcode || body.postCode || null,
      streetAddress: body.streetAddress || body.address || null,
      service: body.service || null,
      message: body.message || null,
      marketingConsent: !!body.marketingConsent,
      dataConsent: !!body.dataConsent,
      rawPayload: body,
    };
    return this.prisma.formSubmission.create({ data });
  }

  list(q?: string) {
    return this.prisma.formSubmission.findMany({
      where: q ? { OR: [
        { email: { contains: q, mode: 'insensitive' }},
        { phone: { contains: q }},
        { service: { contains: q, mode: 'insensitive' }},
      ]} : undefined,
      orderBy: { createdAt: 'desc' }
    });
  }
}
