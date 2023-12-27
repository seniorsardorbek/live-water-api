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
} from '@nestjs/common'
import { BasedataService } from './basedata.service'
import { CreateBasedatumDto } from './dto/create-basedatum.dto'
import { UpdateBasedatumDto } from './dto/update-basedatum.dto'
import { QueryDto } from 'src/_shared/query.dto'
import { BasedataQueryDto } from './dto/basedata.query.dto'
import { Response } from 'express'

@Controller('basedata')
export class BasedataController {
  constructor(private readonly basedataService: BasedataService) {}
  // !
  @Post()
  create(@Body() createBasedatumDto: CreateBasedatumDto) {
    return this.basedataService.create(createBasedatumDto)
  }
  // !
  @Get()
  findAll(@Query() query: BasedataQueryDto) {
    return this.basedataService.findAll(query)
  }
  // !
  @Get("xlsx")
  async exportToExcel(@Res() res: Response , @Query() query: BasedataQueryDto){
    return this.basedataService.xlsx( query, res );
  }
  @Get('last-updated')
  lastData(@Query() query: QueryDto) {
    return this.basedataService.lastData(query)
  }
  // !
  @Get('device/:id')
  findOneDevice(@Param('id') id: string, @Query() query: QueryDto) {
    return this.basedataService.findOneDevice(query, id)
  }
  // !
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basedataService.findOne(id)
  }
  // !
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBasedatumDto: UpdateBasedatumDto
  ) {
    return this.basedataService.update(id, updateBasedatumDto)
  }
  // !
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basedataService.remove(id)
  }
}
