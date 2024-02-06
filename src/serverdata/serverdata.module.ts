import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Serverdata, ServerdataSchema } from './Schema/Serverdata'
import { ServerdataController } from './serverdata.controller'
import { ServerdataService } from './serverdata.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Serverdata.name, schema: ServerdataSchema },
    ]),
  ],
  controllers: [ServerdataController],
  providers: [ServerdataService],
  exports: [ServerdataService],
})
export class ServerdataModule {}
