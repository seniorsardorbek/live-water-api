import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import config from './_shared/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BasedataModule } from './basedata/basedata.module'
import { DevicesModule } from './devices/devices.module'
import { RegionsModule } from './regions/regions.module'
import { ServerdataModule } from './serverdata/serverdata.module'
import { UsersModule } from './users/users.module'
import { MqttModule } from './mqtt/mqtt.module'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    MongooseModule.forRoot(`${config.db.host}/${config.db.name}`),
    
    MqttModule,
    UsersModule,
    RegionsModule,
    ScheduleModule.forRoot(),
    DevicesModule,
    BasedataModule,
    ServerdataModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
