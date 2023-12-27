import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { RegionsService } from './regions.service'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto)
  }

  @Get()
  findAll(@Query() query : QueryDto) {
    return this.regionsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param(ValidationPipe) id: ParamIdDto) {
    return this.regionsService.findOne(id)
  }

  @Patch(':id')
  update(@Param(ValidationPipe) id: ParamIdDto, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(id, updateRegionDto)
  }

  @Delete(':id')
  remove(@Param(ValidationPipe) id: ParamIdDto) {
    return this.regionsService.remove(id)
  }
}
