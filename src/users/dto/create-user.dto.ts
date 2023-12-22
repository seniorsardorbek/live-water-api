import { IsEnum, IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId, isObjectIdOrHexString } from 'mongoose';
import { UserRole } from 'src/_shared/enums';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsMongoId()
    region: ObjectId;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole
}
