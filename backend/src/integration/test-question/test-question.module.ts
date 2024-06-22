import { Module } from '@nestjs/common';
import { TestQuestionService } from './test-question.service';
import { TestQuestionController } from './test-question.controller';

@Module({
  controllers: [TestQuestionController],
  providers: [TestQuestionService],
})
export class TestQuestionModule {}
