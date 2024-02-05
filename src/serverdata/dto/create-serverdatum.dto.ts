import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateServerdatumDto {
  @IsNotEmpty()
  @IsString()
  message: string;


  @IsNotEmpty()
  @IsString()
  device_privet_key: string;


  @IsNotEmpty()
  @IsMongoId()
  basedata: ObjectId;


  @IsNotEmpty()
  @IsNumber()
  send_data_in_ms: number;


  @IsNotEmpty()
  @IsNumber()
  status_code: number;
}
