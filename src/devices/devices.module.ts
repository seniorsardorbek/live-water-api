import { Module } from '@nestjs/common'
import { DevicesService } from './devices.service'
import { DevicesController } from './devices.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Device, DeviceSchema } from './Schema/Device'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],

  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
