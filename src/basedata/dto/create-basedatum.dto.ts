import { IsEnum, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Status } from "src/_shared/enums";

export class CreateBasedatumDto {
    @IsString()
    device: ObjectId

    @IsNumber()
    level: number

    @IsNumber()
    volume: number

    @IsNumber()
    salinity: number

    @IsNumber()
    date_in_ms: number

    @IsEnum(Status)
    signal: Status
}
