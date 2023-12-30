import { Controller, Post } from '@nestjs/common'
import { TctService } from './tct.service'

@Controller('tct')
export class TctController {
  constructor(private readonly tctService: TctService) {}

  @Post()
  create() {
    return this.tctService.create()
  }
}
