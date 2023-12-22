import { IsMongoId, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateDeviceDto {
    @IsString()
    serie: string

    @IsString()
    device_privet_key: string

    @IsString()
    ip_address: string
    
    @IsNumber()
    port: number

    @IsNumber()
    lat: number

    @IsNumber()
    long: number

    @IsMongoId()
    region: ObjectId


    @IsMongoId()
    owner: ObjectId

}
