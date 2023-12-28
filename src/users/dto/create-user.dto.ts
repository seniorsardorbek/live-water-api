import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ObjectId, isObjectIdOrHexString } from 'mongoose'
import { title } from 'process'
import { UserRole } from 'src/_shared/enums'

export class CreateUserDto {
  @ApiProperty({
    title: 'First Name',
    example: 'Sardorbek',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string

  @ApiProperty({
    title: 'Lastname Name',
    example: 'Samijonov',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string

  @ApiProperty({
    title: 'username unique',
    example: 'sardorbek01',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    title: 'password min8 max20',
    example: 'uirebe9885 ',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string

  @ApiProperty({
    title: 'region Id mongoId',
    example: 'b7912hfwgwi83',
  })
  @IsNotEmpty()
  @IsMongoId()
  region: ObjectId

  @ApiProperty({
    title: 'role operator | admin',
    example: 'operator',
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole
}
