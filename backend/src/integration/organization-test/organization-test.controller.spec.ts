import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationTestController } from './organization-test.controller';
import { OrganizationTestService } from './organization-test.service';

describe('OrganizationTestController', () => {
  let controller: OrganizationTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationTestController],
      providers: [OrganizationTestService],
    }).compile();

    controller = module.get<OrganizationTestController>(OrganizationTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
