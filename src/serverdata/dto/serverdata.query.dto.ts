import { Transform, Type } from 'class-transformer'
import {
  IsEnum,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { ObjectId } from 'mongoose'
import { SortOrder } from 'src/_shared/enums'
import { Paginate } from 'src/_shared/query.dto'

class Sort {
  @IsEnum(SortOrder)
  order: SortOrder

  @IsNotEmpty()
  @IsIn(['status', 'send_data_in_ms', 'volume'])
  by: string
}

class Filter {
  @IsOptional()
  @IsMongoId()
  device: ObjectId

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  start: number

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  end: number
}

export class ServerdataQueryDto {
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
