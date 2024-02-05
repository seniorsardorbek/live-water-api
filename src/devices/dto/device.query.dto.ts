import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Paginate } from 'src/_shared/query.dto';

class Filter {
  @ApiProperty({
    title: 'Region ID',
    example: '612aa3bc93ecef4c4f4a66d4',
  })
  @IsOptional()
  @IsMongoId()
  region: ObjectId;
}

export class DeviceQueryDto {
  @ApiProperty({
    title: 'Pagination options',
    type: Paginate,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Paginate)
  page?: Paginate;

  @ApiProperty({
    title: 'Filter options',
    type: Filter,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Filter)
  filter?: Filter;
}
