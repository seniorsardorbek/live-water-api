import { Transform, Type } from 'class-transformer'
import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import { Paginate } from 'src/_shared/query.dto'
class Filter {
  @IsOptional()
  @IsString()
  region: string
}

export class DeviceQueryDto {
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
