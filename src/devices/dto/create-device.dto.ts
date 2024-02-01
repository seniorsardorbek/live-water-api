import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'

export class CreateDeviceDto {
  @ApiProperty({
    title: 'Name ',
    example: 'Andijon birinchi daha',
  })
  @IsNotEmpty()
  @IsString()
  name: string


  @ApiProperty({
    title: 'serie  unique',
    example: '7620fw073',
  })
  @IsNotEmpty()
  @IsString()
  serie: string

  @ApiProperty({
    title: 'device private key unique',
    example: 'heuwihfb',
  })
  @IsNotEmpty()
  @IsString()
  device_privet_key: string

 

  @ApiProperty({
    title: 'lat',
    example: '53.6881488',
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  lat: number

  @ApiProperty({
    title: 'long',
    example: '56.588925',
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  long: number

  @ApiProperty({
    title: 'region mongoId ',
    example: '658c3bf023576fadfe9dc157',
  })
  @IsNotEmpty()
  @IsMongoId()
  region: ObjectId

  @ApiProperty({
    title: 'owner ',
    example: '658c3bf023576fadfe9dc157',
  })
  @IsNotEmpty()
  @IsMongoId()
  owner: ObjectId
}
