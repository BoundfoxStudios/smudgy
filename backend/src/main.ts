import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS_ORIGIN, isDebug } from './constants';

const logger = new Logger('Smudgy Backend');

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, { cors: { origin: CORS_ORIGIN } });
  await app.listen(port);

  logger.log(`Backend up and running on: ${await app.getUrl()}`);

  if (isDebug) {
    logger.warn('Running in DEBUG mode. Set NODE_ENV to production to disable debug mode.');
  }
}

void bootstrap();
