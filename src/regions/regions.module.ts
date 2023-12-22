import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { Region, RegionSchema } from './Schema/Regions';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from 'src/devices/Schema/Device';

@Module({
  imports: [MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule { }
