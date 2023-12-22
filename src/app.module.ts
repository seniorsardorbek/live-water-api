import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RegionsModule } from './regions/regions.module';
import { DevicesModule } from './devices/devices.module';
import config from './_shared/config';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.db.host}/${config.db.name}`),
    UsersModule,
    RegionsModule,
    DevicesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
