import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Basedata, BasedataSchema } from './Schema/Basedatas';
import { BasedataController } from './basedata.controller';
import { BasedataService } from './basedata.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Basedata.name, schema: BasedataSchema }]),],
  controllers: [BasedataController],
  providers: [BasedataService],
})
export class BasedataModule { }
