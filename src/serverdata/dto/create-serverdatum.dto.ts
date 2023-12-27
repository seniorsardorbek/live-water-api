import { IsMongoId, IsNumber, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'

export class CreateServerdatumDto {
  @IsString()
  message: string

  @IsString()
  device_privet_key: string

  @IsMongoId()
  basedata: ObjectId

  @IsNumber()
  send_data_in_ms: number

  @IsNumber()
  status_code: number
}
