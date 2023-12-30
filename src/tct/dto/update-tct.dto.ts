import { PartialType } from '@nestjs/swagger'
import { CreateTctDto } from './create-tct.dto'

export class UpdateTctDto extends PartialType(CreateTctDto) {}
