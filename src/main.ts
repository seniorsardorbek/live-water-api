import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './shared/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
}
bootstrap();
