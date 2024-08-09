import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from './_shared/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['https://dayver.livewater.uz', 'http://172.22.0.1:5173' , 'http://localhost:5173'], // specify the allowed origin(s) as an array
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // specify the allowed headers
    exposedHeaders: ['Content-Length', 'X-Request-ID'], // specify the exposed headers
    credentials: true, // enable sending cookies with cross-origin requests
    maxAge: 3600, // specify the maximum age (in seconds) for preflight requests (OPTION method)
    preflightContinue: false, // if true, the preflight OPTIONS request will be passed to the next middleware in the stack
    optionsSuccessStatus: 204, // specify the status code to use for successful OPTIONS requests
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )

  const swaggerc = new DocumentBuilder()
    .setTitle('Live Water (dayver)')
    .setDescription('Documentation for live water')
    .setVersion('2.2')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerc)
  SwaggerModule.setup('api', app, document)
  await app.listen(config.port)
}
bootstrap()
