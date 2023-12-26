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
import { DevicesService } from './devices.service'
import { CreateDeviceDto } from './dto/create-device.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'
import { QueryDto } from 'src/_shared/query.dto'
import { DeviceQueryDto } from './dto/device.query.dto'

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto)
  }

  @Get()
  findAll(@Query() query : QueryDto) {
    return this.devicesService.findAll(query)
  }

  @Get('/reg')
  regionAll(@Query() query : DeviceQueryDto) {
    return this.devicesService.regionAll(  query)
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(id)
  }
}
