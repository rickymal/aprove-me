import { Test, TestingModule } from '@nestjs/testing';
import { TestQuestionController } from './test-question.controller';
import { TestQuestionService } from './test-question.service';

describe('TestQuestionController', () => {
  let controller: TestQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestQuestionController],
      providers: [TestQuestionService],
    }).compile();

    controller = module.get<TestQuestionController>(TestQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
