import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateBasedatumDto {
  @ApiProperty({
    title: 'Level',
    example: 1,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  level: number


  @ApiProperty({
    title: 'Serie',
    example: 1,
  })
  @IsNotEmpty()
  serie: string
}
