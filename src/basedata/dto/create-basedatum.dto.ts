import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'
import { Status } from 'src/_shared/enums'

export class CreateBasedatumDto {
  @ApiProperty({
    title: 'Device Id (mongoId)',
    example: '658c3bf023576fadfe9dc157',
  })
  @IsNotEmpty()
  @IsString()
  device: ObjectId

  @ApiProperty({
    title: 'Level',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  level: number

  @ApiProperty({
    title: 'Volume number',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  volume: number
  
  @ApiProperty({
    title: 'Pressure number',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  pressure: number

  @ApiProperty({
    title: 'Salinity number',
    example: 12,
  })
  @IsNotEmpty()
  @IsNumber()
  salinity: number

  @ApiProperty({
    title: 'Timestamp',
    example: 1703689200147,
  })
  @IsNotEmpty()
  @IsNumber()
  date_in_ms?: number

  @ApiProperty({
    title: 'Signal enum good | nosignal',
    example: 'good',
  })
  @IsNotEmpty()
  @IsEnum(Status)
  signal: Status
}
