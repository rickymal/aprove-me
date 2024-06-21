import { Module } from '@nestjs/common';
import { StudentQuestionService } from './student-question.service';
import { StudentQuestionController } from './student-question.controller';

@Module({
  controllers: [StudentQuestionController],
  providers: [StudentQuestionService],
})
export class StudentQuestionModule {}
