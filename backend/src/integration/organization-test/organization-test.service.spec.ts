import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationTestService } from './organization-test.service';

describe('OrganizationTestService', () => {
  let service: OrganizationTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationTestService],
    }).compile();

    service = module.get<OrganizationTestService>(OrganizationTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
