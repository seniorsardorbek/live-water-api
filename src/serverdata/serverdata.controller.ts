import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ServerdataService } from './serverdata.service'
import { CreateServerdatumDto } from './dto/create-serverdatum.dto'
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto'
import { QueryDto } from 'src/_shared/query.dto'

@Controller('serverdata')
export class ServerdataController {
  constructor(private readonly serverdataService: ServerdataService) {}

  @Post()
  create(@Body() createServerdatumDto: CreateServerdatumDto) {
    return this.serverdataService.create(createServerdatumDto)
  }

  @Get()
  findAll(@Query() query : QueryDto) {
    return this.serverdataService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverdataService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServerdatumDto: UpdateServerdatumDto
  ) {
    return this.serverdataService.update(id, updateServerdatumDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverdataService.remove(id)
  }
}
