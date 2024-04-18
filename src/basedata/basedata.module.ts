import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Basedata, BasedataSchema } from './Schema/Basedatas'
import { BasedataController } from './basedata.controller'
import { BasedataService } from './basedata.service'
import { Device, DeviceSchema } from 'src/devices/Schema/Device'
import { Serverdata, ServerdataSchema } from 'src/serverdata/Schema/Serverdata'
import { ServerdataService } from 'src/serverdata/serverdata.service'
import { ScheduleModule } from '@nestjs/schedule'
import { HttpModule } from '@nestjs/axios'
import { MqttModule } from 'src/mqtt/mqtt.module'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([
      { name: Basedata.name, schema: BasedataSchema },
      { name: Device.name, schema: DeviceSchema },
      { name: Serverdata.name, schema: ServerdataSchema },
    ]),
    ScheduleModule.forRoot(),
    MqttModule,
    HttpModule,
  ],
  controllers: [BasedataController],
  providers: [BasedataService],
})
export class BasedataModule {}
