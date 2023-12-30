import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common'
import { ServerdataService } from './serverdata.service'
import { CreateServerdatumDto } from './dto/create-serverdatum.dto'
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { Response } from 'express'
import { ServerdataQueryDto } from './dto/serverdata.query.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('serverdata')
@ApiTags('Serverdata')
export class ServerdataController {
  constructor(private readonly serverdataService: ServerdataService) {}

  @Post()
  create(@Body() createServerdatumDto: CreateServerdatumDto) {
    return this.serverdataService.create(createServerdatumDto)
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.serverdataService.findAll(query)
  }

  @Get(':id')
  findOne(@Param(ValidationPipe) id: ParamIdDto) {
    return this.serverdataService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param(ValidationPipe) id: ParamIdDto,
    @Body() updateServerdatumDto: UpdateServerdatumDto
  ) {
    return this.serverdataService.update(id, updateServerdatumDto)
  }

  @Delete(':id')
  remove(@Param(ValidationPipe) id: ParamIdDto) {
    return this.serverdataService.remove(id)
  }
  @Get('xlsx')
  async exportToExcel(
    @Res() res: Response,
    @Query() query: ServerdataQueryDto
  ) {
    return this.serverdataService.xlsx(query, res)
  }
}
