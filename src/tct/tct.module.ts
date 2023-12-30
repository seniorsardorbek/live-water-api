import { Module } from '@nestjs/common'
import { TctService } from './tct.service'
import { TctController } from './tct.controller'
import { ScheduleModule } from '@nestjs/schedule'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'
import { Device, DeviceSchema } from 'src/devices/Schema/Device'
import { Serverdata, ServerdataSchema } from 'src/serverdata/Schema/Serverdata'
import { Basedata, BasedataSchema } from 'src/basedata/Schema/Basedatas'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema },
      { name: Serverdata.name, schema: ServerdataSchema },
      { name: Basedata.name, schema: BasedataSchema },
    ]),
  ],
  controllers: [TctController],
  providers: [TctService],
})
export class TctModule {}
