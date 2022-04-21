import { Test, TestingModule } from '@nestjs/testing';
import { ModelMapperService } from './model-mapper.service';

describe('ModelMapperService', () => {
  let service: ModelMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelMapperService],
    }).compile();

    service = module.get<ModelMapperService>(ModelMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
