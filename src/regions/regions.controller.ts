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
import { RegionsService } from './regions.service'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { QueryDto } from 'src/_shared/query.dto'

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
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(id, updateRegionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id)
  }
}
