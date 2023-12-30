import { Test, TestingModule } from '@nestjs/testing'
import { TctService } from './tct.service'

describe('TctService', () => {
  let service: TctService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TctService],
    }).compile()

    service = module.get<TctService>(TctService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
