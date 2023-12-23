import { Module } from '@nestjs/common';
import { ServerdataService } from './serverdata.service';
import { ServerdataController } from './serverdata.controller';

@Module({
  controllers: [ServerdataController],
  providers: [ServerdataService],
})
export class ServerdataModule {}
