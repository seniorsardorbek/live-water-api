import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe
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
    description: 'Creates a new user record in the system.',
    type: User,
  })
  
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
 
  @Get()
  @ApiCreatedResponse({
    description: 'Retrieves all user records in the system.',
  })
  findAll(@Query() query: QueryDto) {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'Retrieves a specific user record by ID.',
    type: User,
  })
  findOne(@Param(ValidationPipe) id: ParamIdDto) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'Updates a specific user record by ID.',
    type: User,
  })
  update(
    @Param(ValidationPipe) id: ParamIdDto,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deletes a specific user record by ID.',
  })
  remove(@Param(ValidationPipe) id: ParamIdDto) {
    return this.usersService.remove(id)
  }
}
