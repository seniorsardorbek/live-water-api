import { PartialType } from '@nestjs/mapped-types';
import { CreateServerdatumDto } from './create-serverdatum.dto';

export class UpdateServerdatumDto extends PartialType(CreateServerdatumDto) {}
