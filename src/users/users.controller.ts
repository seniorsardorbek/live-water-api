import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { User } from './Schema/Users'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  // @SetRoles('super_admin', 'admin')
  // @UseGuards(IsLoggedIn, HasRole)

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  findOne(@Param(ValidationPipe) id: ParamIdDto) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param(ValidationPipe) id: ParamIdDto,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param(ValidationPipe) id: ParamIdDto) {
    return this.usersService.remove(id)
  }
}
