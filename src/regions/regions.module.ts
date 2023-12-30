import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Region, RegionSchema } from './Schema/Regions'
import { RegionsController } from './regions.controller'
import { RegionsService } from './regions.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
