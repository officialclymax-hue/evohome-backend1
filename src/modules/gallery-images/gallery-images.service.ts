import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class GalleryImagesService {
  constructor(private prisma: PrismaService) {}

  list(category?: string) {
    return this.prisma.galleryImage.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });
  }

  create(dto: any) {
    return this.prisma.galleryImage.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.galleryImage.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.galleryImage.delete({ where: { id } });
  }
}
