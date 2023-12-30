import { Test, TestingModule } from '@nestjs/testing'
import { TctController } from './tct.controller'
import { TctService } from './tct.service'

describe('TctController', () => {
  let controller: TctController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TctController],
      providers: [TctService],
    }).compile()

    controller = module.get<TctController>(TctController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
