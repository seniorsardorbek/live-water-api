import { PartialType } from '@nestjs/mapped-types';
import { CreateBasedatumDto } from './create-basedatum.dto';

export class UpdateBasedatumDto extends PartialType(CreateBasedatumDto) {}
