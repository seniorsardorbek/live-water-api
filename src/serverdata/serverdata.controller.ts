import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto'
import { ServerdataService } from './serverdata.service'

@Controller('serverdata')
@ApiTags('Serverdata')
export class ServerdataController {
  constructor(private readonly serverdataService: ServerdataService) {}

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.serverdataService.findAll(query)
  }

  @Get(':id')
  findOne(@Param(ValidationPipe) id: ParamIdDto) {
    return this.serverdataService.findOne(id)
  }



  @Delete(':id')
  remove(@Param(ValidationPipe) id: ParamIdDto) {
    return this.serverdataService.remove(id)
  }
}
