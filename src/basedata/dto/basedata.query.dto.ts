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
  @IsIn(['level', 'salnity', 'volume' , "pressure", 'created_at', 'updated_at'])
  by: string
}

class Filter {
  @IsOptional()
  @IsMongoId()
  device: ObjectId

  @IsOptional()
  @IsMongoId()
  region: ObjectId

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
