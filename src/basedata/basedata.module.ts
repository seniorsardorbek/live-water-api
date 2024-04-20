import { HttpModule } from '@nestjs/axios'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import { Device, DeviceSchema } from 'src/devices/Schema/Device'
import { MqttModule } from 'src/mqtt/mqtt.module'
import { Serverdata, ServerdataSchema } from 'src/serverdata/Schema/Serverdata'
import { Basedata, BasedataSchema } from './Schema/Basedatas'
import { BasedataController } from './basedata.controller'
import { BasedataService } from './basedata.service'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true ,
      host: 'localhost',
      port: 6379,
    }),
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
