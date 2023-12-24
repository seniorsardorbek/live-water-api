import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from './_shared/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )

  await app.listen(config.port)
}
bootstrap()
