import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Basedata, BasedataSchema } from 'src/basedata/Schema/Basedatas'
import { Device, DeviceSchema } from 'src/devices/Schema/Device'
import { Serverdata, ServerdataSchema } from './Schema/Serverdata'
import { ServerdataController } from './serverdata.controller'
import { ServerdataService } from './serverdata.service'
import { ScheduleModule } from '@nestjs/schedule'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Serverdata.name, schema: ServerdataSchema },
      { name: Basedata.name, schema: BasedataSchema },
      { name: Device.name, schema: DeviceSchema },
    ]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [ServerdataController],
  providers: [ServerdataService],
  exports: [ServerdataService],
})
export class ServerdataModule {}
