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
import { BasedataService } from './basedata.service'
import { CreateBasedatumDto } from './dto/create-basedatum.dto'
import { UpdateBasedatumDto } from './dto/update-basedatum.dto'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { BasedataQueryDto } from './dto/basedata.query.dto'
import { Response } from 'express'
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Basedata } from './Schema/Basedatas'

@Controller('basedata')
@ApiTags('Basedata')
export class BasedataController {
  constructor(private readonly basedataService: BasedataService) {}
  // !
  @Post()
  @ApiCreatedResponse({
    description: 'Automatically generated basedata ',
    type: Basedata,
  })
  create(@Body() createBasedatumDto: CreateBasedatumDto) {
    return this.basedataService.create(createBasedatumDto)
  }
  // !
  @Get()
  @ApiOperation({
    summary: 'Get all cats',
    description: 'Returns an array of all cats.',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved cats.' })
  findAll(@Query() query: BasedataQueryDto) {
    return this.basedataService.findAll(query)
  }
  // !
  @Get('xlsx')
  async exportToExcel(@Res() res: Response, @Query() query: BasedataQueryDto) {
    return this.basedataService.xlsx(query, res)
  }
  @Get('last-updated')
  lastData(@Query() query: QueryDto) {
    return this.basedataService.lastData(query)
  }
  // !
  @Get('device/:id')
  @ApiOperation({
    summary: 'id orqali olish',
    description: 'Aynan bitta qurilma malumotlarini qaytarish.',
  })
  @ApiResponse({ status: 200, description: 'Muvavvaqqiyatli olindi' })
  @ApiResponse({ status: 404, description: 'Xatolik.' })
  findOneDevice(
    @Param(ValidationPipe) id: ParamIdDto,
    @Query() query: QueryDto
  ) {
    return this.basedataService.findOneDevice(query, id)
  }
  // !
  @Get(':id')
  @ApiOperation({
    summary: 'id orqali olish',
    description: 'malumotni qaytarish qaytarish.',
  })
  @ApiResponse({ status: 200, description: 'Muvavvaqqiyatli olindi' })
  @ApiResponse({ status: 404, description: 'Xatolik.' })
  findOne(@Param(ValidationPipe) id: ParamIdDto) {
    return this.basedataService.findOne(id)
  }
  // !
  @Patch(':id')
  @ApiOperation({
    summary: 'id orqali yangilash',
    description: 'id orqali yangilash.',
  })
  @ApiResponse({ status: 200, description: 'Muvafqqattiyatli yangilandi' })
  @ApiResponse({ status: 404, description: 'Mavjud emas.' })
  update(
    @Param(ValidationPipe) id: ParamIdDto,
    @Body() updateBasedatumDto: UpdateBasedatumDto
  ) {
    return this.basedataService.update(id, updateBasedatumDto)
  }
  // !
  @Delete(':id')
  remove(@Param(ValidationPipe) id: ParamIdDto) {
    return this.basedataService.remove(id)
  }
}
