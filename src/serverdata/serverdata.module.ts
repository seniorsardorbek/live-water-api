import { Module } from '@nestjs/common'
import { ServerdataService } from './serverdata.service'
import { ServerdataController } from './serverdata.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Serverdata, ServerdataSchema } from './Schema/Serverdata'
import { BasedataModule } from 'src/basedata/basedata.module'

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
