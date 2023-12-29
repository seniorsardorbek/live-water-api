import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsInt,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

export class Paginate {
  @ApiProperty({
    title: 'offset page number',
    default: 0,
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  offset?: number

  @ApiProperty({
    title: 'limit number  ',
    default: 10,
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  limit?: number
}

export class QueryDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Paginate)
  page?: Paginate

  @IsOptional()
  @IsString()
  q?: string
}

export class ParamIdDto {
  @ApiProperty({
    title: 'Mongo Id ',
    example: '658db8b7368321d137d31082',
  })
  @IsMongoId()
  id: string
}
