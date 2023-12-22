import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasedataService } from './basedata.service';
import { CreateBasedatumDto } from './dto/create-basedatum.dto';
import { UpdateBasedatumDto } from './dto/update-basedatum.dto';

@Controller('basedata')
export class BasedataController {
  constructor(private readonly basedataService: BasedataService) {}

  @Post()
  create(@Body() createBasedatumDto: CreateBasedatumDto) {
    return this.basedataService.create(createBasedatumDto);
  }

  @Get()
  findAll() {
    return this.basedataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basedataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasedatumDto: UpdateBasedatumDto) {
    return this.basedataService.update(+id, updateBasedatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basedataService.remove(+id);
  }
}
