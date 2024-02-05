import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class Paginate {
  @ApiProperty({
    title: 'Offset page number',
    default: 0,
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiProperty({
    title: 'Limit number',
    default: 10,
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  limit?: number;
}

export class QueryDto {
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
    title: 'Search query',
    example: 'search keyword',
  })
  @IsOptional()
  @IsString()
  q?: string;
}

export class ParamIdDto {
  @ApiProperty({
    title: 'MongoDB ID',
    example: '658db8b7368321d137d31082',
  })
  @IsMongoId()
  id: string;
}
