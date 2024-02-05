import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { multerOptions } from 'src/_shared/multer.options'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { CustomRequest } from 'src/_shared/response'
import { IsLoggedIn } from 'src/auth/is-loggin.guard'
import { DevicesService } from './devices.service'
import { CreateDeviceDto } from './dto/create-device.dto'
import { DeviceQueryDto } from './dto/device.query.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'
@Controller('devices')
@ApiTags('Device')
export class DevicesController {
  constructor (private readonly devicesService: DevicesService) {}
  @Post()
  create (
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return this.devicesService.create(createDeviceDto, )
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
  userAllDevices (@Req() req: CustomRequest, @Query() query: QueryDto) {
    return this.devicesService.oneUserDevices(req, query)
  }
  @Get('/:id')
  findOne (@Param(ValidationPipe) id: ParamIdDto) {
    return this.devicesService.findOne(id)
  }

  @Patch(':id')
  update (
    @Param(ValidationPipe) id: ParamIdDto,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(id, updateDeviceDto)
  }

  @Delete(':id')
  remove (@Param(ValidationPipe) id: ParamIdDto) {
    return this.devicesService.remove(id)
  }
}
