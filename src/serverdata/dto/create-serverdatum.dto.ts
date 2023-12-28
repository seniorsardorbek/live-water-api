import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'

export class CreateServerdatumDto {
  @ApiProperty({
    title: 'Message string ',
    example: 'Yaxshi ',
  })
  @IsNotEmpty()
  @IsString()
  message: string

  @ApiProperty({
    title: 'device private key',
    example: '7620fw073',
  })
  @IsNotEmpty()
  @IsString()
  device_privet_key: string

  @ApiProperty({
    title: 'basedata id ',
    example: '8723072jr',
  })
  @IsNotEmpty()
  @IsMongoId()
  basedata: ObjectId

  @ApiProperty({
    title: 'send_data_in_ms  in timestamp',
    example: 1703689200147,
  })
  @IsNotEmpty()
  @IsNumber()
  send_data_in_ms: number

  @ApiProperty({
    title: 'statuc_code number  ',
    example: '200',
  })
  @IsNotEmpty()
  @IsNumber()
  status_code: number
}
