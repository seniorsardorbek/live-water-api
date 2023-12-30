import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { RegionsModule } from './regions/regions.module'
import { DevicesModule } from './devices/devices.module'
import { BasedataModule } from './basedata/basedata.module'
import { ServerdataModule } from './serverdata/serverdata.module'
import config from './_shared/config'
import { AuthModule } from './auth/auth.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TctModule } from './tct/tct.module'

@Module({
  imports: [
    MongooseModule.forRoot(`${config.db.host}/${config.db.name}`),
    UsersModule,
    RegionsModule,
    ScheduleModule.forRoot(),
    DevicesModule,
    BasedataModule,
    ServerdataModule,
    AuthModule,
    TctModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
