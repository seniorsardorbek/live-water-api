import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRegionDto {
  @ApiProperty({
    title: 'Name string',
    example: 'Toshkent vlioyati',
  })
  @IsNotEmpty()
  @IsString()
  name: string
}
