import { Module } from '@nestjs/common';
import { RequestQuoteController } from './request-quote.controller';
import { RequestQuoteService } from './request-quote.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [RequestQuoteController],
  providers: [RequestQuoteService, PrismaService],
})
export class RequestQuoteModule {}
