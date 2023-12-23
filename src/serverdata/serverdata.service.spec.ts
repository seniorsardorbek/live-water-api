import { Test, TestingModule } from '@nestjs/testing';
import { ServerdataService } from './serverdata.service';

describe('ServerdataService', () => {
  let service: ServerdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerdataService],
    }).compile();

    service = module.get<ServerdataService>(ServerdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
