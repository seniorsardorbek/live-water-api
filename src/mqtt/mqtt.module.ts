import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MqttService } from './mqtt.service'

@Module({
  providers: [MqttService, ConfigService, Object],
  exports: [MqttService],
})
export class MqttModule {}
