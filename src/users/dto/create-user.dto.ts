import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';
import { UserRole } from 'src/_shared/enums';

export class CreateUserDto {
  @ApiProperty({
    title: 'First Name',
    example: 'Sardorbek',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    title: 'Last Name',
    example: 'Samijonov',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    title: 'Username (unique)',
    example: 'sardorbek01',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    title: 'Password (min 8 characters, max 20 characters)',
    example: 'uirebe9885 ',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    title: 'Region ID (MongoDB ObjectId)',
    example: '612aa3bc93ecef4c4f4a66d4',
  })
  @IsNotEmpty()
  @IsMongoId()
  region: ObjectId;

  @ApiProperty({
    title: 'Role (operator or admin)',
    example: 'operator',
    enum: UserRole,
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
