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
  Req,
  UseGuards,
} from '@nestjs/common'
import { DevicesService } from './devices.service'
import { CreateDeviceDto } from './dto/create-device.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { DeviceQueryDto } from './dto/device.query.dto'
import { ApiTags } from '@nestjs/swagger'
import { CustomRequest } from 'src/_shared/response'
import { IsLoggedIn } from 'src/auth/is-loggin.guard'
import { HasRole } from 'src/auth/has-roles.guard'

@Controller('devices')
@ApiTags('Device')
export class DevicesController {
  constructor (private readonly devicesService: DevicesService) {}

  @Post()
  create (@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto)
  }

  @Get()
  findAll (@Query() query: QueryDto) {
    return this.devicesService.findAll(query)
  }

  @Get('/reg')
  regionAll (@Query() query: DeviceQueryDto) {
    return this.devicesService.regionAll(query)
  }

  @UseGuards(IsLoggedIn)
  @Get('/user')
  userAllDevices (@Req() req: CustomRequest ,@Query() query: QueryDto) {
    return this.devicesService.oneUserDevices(req ,  query)
  }
  @Get('/:id')
  findOne (@Param(ValidationPipe) id: ParamIdDto) {
    return this.devicesService.findOne(id)
  }

  @Patch(':id')
  update (
    @Param(ValidationPipe) id: ParamIdDto,
    @Body() updateDeviceDto: UpdateDeviceDto
  ) {
    return this.devicesService.update(id, updateDeviceDto)
  }

  @Delete(':id')
  remove (@Param(ValidationPipe) id: ParamIdDto) {
    return this.devicesService.remove(id)
  }
}
