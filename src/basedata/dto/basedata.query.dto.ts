import { Transform, Type } from 'class-transformer'
import {
  IsOptional,
  IsEnum,
  IsString,
  ValidateNested,
  IsNotEmpty,
  IsIn,
  IsObject,
  IsBoolean,
  IsNumber,
} from 'class-validator'
import { SortOrder } from 'src/_shared/enums'
import { Paginate } from 'src/_shared/query.dto'

class Sort {
  @IsEnum(SortOrder)
  order: SortOrder

  @IsNotEmpty()
  @IsIn(['level', 'salnity', 'volume', 'created_at', 'updated_at'])
  by: string
}

class Filter {
  @IsOptional()
  @IsString()
  device: string
  
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  start: number

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  end: number
}

export class BasedataQueryDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Sort)
  sort?: Sort

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Paginate)
  page?: Paginate

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Filter)
  filter?: Filter
}
