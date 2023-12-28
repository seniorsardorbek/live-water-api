import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from './_shared/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule , {
    cors: { origin: "*", credentials: true },
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )

  const swaggerc = new DocumentBuilder()
  .setTitle('Live Water ')
  .setDescription('Documentation for live water')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, swaggerc);
SwaggerModule.setup('api', app, document);
  await app.listen(config.port)
}
bootstrap()
