import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterConfig } from 'src/_shared/multer.middleware'
import { Device, DeviceSchema } from './Schema/Device'
import { DevicesController } from './devices.controller'
import { DevicesService } from './devices.service'

@Module({
  imports: [
    // MulterConfig ,
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],

  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
