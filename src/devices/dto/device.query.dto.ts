import { Type } from 'class-transformer'
import {
  IsMongoId,
  IsObject,
  IsOptional,
  ValidateNested
} from 'class-validator'
import { ObjectId } from 'mongoose'
import { Paginate } from 'src/_shared/query.dto'
class Filter {
  @IsOptional()
  @IsMongoId()
  region: ObjectId
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
