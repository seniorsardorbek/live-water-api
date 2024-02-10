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
  UseGuards,
  Req,
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
import { IsLoggedIn } from 'src/auth/is-loggin.guard'
import { HasRole } from 'src/auth/has-roles.guard'
import { SetRoles } from 'src/auth/set-roles.decorator'
import { CustomRequest } from 'src/_shared/response'

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
  @Get('last-updated')
  @ApiOperation({
    summary: 'Get last Added basedata',
  })
  lastData() {
    return this.basedataService.lastData()
  }
 
  @Get()
  @ApiOperation({
    summary: 'Get all  basedata',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved cats.' })
  findAll(@Query() query: BasedataQueryDto) {
    return this.basedataService.findAll(query)
  }

  @Get('xlsx')
  async exportToExcel(@Res() res: Response, @Query() query: BasedataQueryDto) {
    return this.basedataService.xlsx(query, res)
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
  //  ! Operator sections
  @SetRoles('operator')
  @UseGuards(IsLoggedIn, HasRole)
  @Get('opr/constructorxlsx')
  operatorDeviceBaseDataXLSX (
    @Req() req: CustomRequest,
    @Res() res: Response,
    @Query() query: BasedataQueryDto
  ) {
    return this.basedataService.operatorDeviceBaseDataXLSX(req, query, res)
  }
  @SetRoles('operator')
  @UseGuards(IsLoggedIn, HasRole)
  @Get('opr/lastadded')
  operatorLastData (@Req() req: CustomRequest) {
    return this.basedataService.lastDataOperator(req)
  }
  @SetRoles('operator')
  @UseGuards(IsLoggedIn, HasRole)
  @Get('opr/constructor')
  operatorDeviceBaseData (
    @Query() query: BasedataQueryDto,
    @Req() req: CustomRequest
  ) {
    return this.basedataService.operatorDeviceBaseData(query, req)
  }

}
