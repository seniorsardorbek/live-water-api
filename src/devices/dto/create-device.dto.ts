import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateDeviceDto {
  @ApiProperty({
    title: 'Serie (unique)',
    example: '7620fw073',
  })
  @IsNotEmpty()
  @IsString()
  serie: string;

  @ApiProperty({
    title: 'Name',
    example: '15',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'Device Private Key (unique)',
    example: 'heuwihfb',
  })
  @IsNotEmpty()
  @IsString()
  device_privet_key: string;

  @ApiProperty({
    title: 'Latitude',
    example: '53.6881488',
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  lat: number;

  @ApiProperty({
    title: 'Longitude',
    example: '56.588925',
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  long: number;

  @ApiProperty({
    title: 'Region ID (MongoDB ObjectId)',
    example: '658c3bf023576fadfe9dc157',
  })
  @IsNotEmpty()
  @IsMongoId()
  region: ObjectId;

  @ApiProperty({
    title: 'Owner ID (MongoDB ObjectId)',
    example: '658c3bf023576fadfe9dc157',
  })
  @IsNotEmpty()
  @IsMongoId()
  owner: ObjectId;
}
