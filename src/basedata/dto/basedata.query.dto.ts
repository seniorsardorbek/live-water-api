import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { SortOrder } from 'src/_shared/enums';
import { Paginate } from 'src/_shared/query.dto';

class Sort {
  @ApiProperty({
    title: 'Sort order',
    enum: SortOrder,
  })
  @IsEnum(SortOrder)
  order: SortOrder;

  @ApiProperty({
    title: 'Sort by',
    example: 'level',
    enum: ['level', 'salinity', 'volume', 'pressure', 'created_at', 'updated_at'],
  })
  @IsNotEmpty()
  @IsIn(['level', 'salinity', 'volume', 'pressure', 'created_at', 'updated_at'])
  by: string;
}

class Filter {
  @ApiProperty({
    title: 'Device ID',
    example: '658db8b7368321d137d31082',
  })
  @IsOptional()
  @IsMongoId()
  device: ObjectId;

  @ApiProperty({
    title: 'Region ID',
    example: '658db8b7368321d137d31082',
  })
  @IsOptional()
  @IsMongoId()
  region: ObjectId;

  @ApiProperty({
    title: 'Start value',
    example: 0,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  start: number;

  @ApiProperty({
    title: 'End value',
    example: 100,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  end: number;
}

export class BasedataQueryDto {
  @ApiProperty({
    title: 'Sort options',
    type: Sort,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Sort)
  sort?: Sort;

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
