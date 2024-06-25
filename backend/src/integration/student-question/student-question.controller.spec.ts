import { Test, TestingModule } from '@nestjs/testing';
import { StudentQuestionController } from './student-question.controller';
import { StudentQuestionService } from './student-question.service';
import { PrismaService } from '@database/prisma.service';

describe('StudentQuestionController', () => {
  let controller: StudentQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentQuestionController],
      providers: [StudentQuestionService, PrismaService],
    }).compile();

    controller = module.get<StudentQuestionController>(StudentQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
