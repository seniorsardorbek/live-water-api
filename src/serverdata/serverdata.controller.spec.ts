import { Test, TestingModule } from '@nestjs/testing'
import { ServerdataController } from './serverdata.controller'
import { ServerdataService } from './serverdata.service'

describe('ServerdataController', () => {
  let controller: ServerdataController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerdataController],
      providers: [ServerdataService],
    }).compile()

    controller = module.get<ServerdataController>(ServerdataController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
