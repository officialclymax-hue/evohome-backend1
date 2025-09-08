import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.use(helmet());
  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.setGlobalPrefix('api');

  // serve static admin app & ingest UI
  app.useStaticAssets(join(__dirname, 'public'), { prefix: '/' });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API on /api  | Admin on /admin  | Ingest UI on /ingest`);
}
bootstrap();
