import { IsMongoId, IsNumber, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'

export class CreateServerdatumDto {
  @IsString()
  message: string

  @IsString()
  device_privet_key: string

  @IsString()
  basedata: string

  @IsString()
  send_data_in_ms: string

  @IsNumber()
  status_code: number
}
