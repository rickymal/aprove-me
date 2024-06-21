import { Test, TestingModule } from '@nestjs/testing';
import { StudentQuestionController } from './student-question.controller';
import { StudentQuestionService } from './student-question.service';

describe('StudentQuestionController', () => {
  let controller: StudentQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentQuestionController],
      providers: [StudentQuestionService],
    }).compile();

    controller = module.get<StudentQuestionController>(StudentQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
