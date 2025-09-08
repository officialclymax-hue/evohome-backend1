import { Body, Controller, Post } from '@nestjs/common';
import { IngestService } from './ingest.service';

@Controller('api/ingest')
export class IngestController {
  constructor(private svc: IngestService) {}

  @Post()
  async ingest(@Body() body: { blob: string }) {
    return this.svc.run(body.blob || '');
  }
}
